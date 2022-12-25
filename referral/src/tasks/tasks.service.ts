import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { subDays } from 'date-fns';
import { get, toNumber, toString } from 'lodash';
import { divide, minus, times } from 'number-precision';
import { ReferralService } from 'src/services/referral.service';
import { Users } from 'src/shared/database/barong_production/entities/Users';
import { Members } from 'src/shared/database/peatio_production/entities/Members';
import { Orders } from 'src/shared/database/peatio_production/entities/Orders';
import { BarongService } from 'src/shared/services/barong.service';
import { PeatioService } from 'src/shared/services/peatio.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private readonly barongService: BarongService,
    private readonly peatioService: PeatioService,
    private readonly referralService: ReferralService,
  ) {}

  // @Cron("45 * * * * *")
  // handleCron() {
  //   this.logger.debug("Called when the second is 45");
  // }

  // @Interval(10000)
  // handleInterval() {
  //   this.logger.debug("Called every 10 seconds");
  // }

  // @Timeout(5000)
  // handleTimeout() {
  //   this.logger.debug("Called once after 5 seconds");
  // }

  @Cron('*15 1 * * *')
  async handleScanReferral() {
    this.logger.debug('Called scan referral');
    const memberList = await this.peatioService.getAllMembers();
    const userList = await this.barongService.getAllUsers();

    const array = [];

    // DO: Filter Friends List
    for (let userIndex = 0; userIndex < userList.length; userIndex++) {
      const iUserID = get(userList[userIndex], 'id', '');
      const iUserUID = get(userList[userIndex], 'uid', '');
      const iMember = memberList.find((member) => member.uid === iUserUID);
      const iMemberID = get(iMember, 'id', '');
      const iUid = get(iMember, 'uid', '');
      const friends = [];

      for (let userJndex = 0; userJndex < userList.length; userJndex++) {
        const jUserID = get(userList[userJndex], 'id', '');
        const jUserUID = get(userList[userJndex], 'uid', '');
        const referralID = get(userList[userJndex], 'referralId', '');

        if (referralID && userIndex !== userJndex && referralID === iUserID) {
          const jMember = memberList.find((member) => member.uid === jUserUID);
          const jMemberID = get(jMember, 'id', '');
          const jUid = get(jMember, 'uid', '');
          const jEmail = get(jMember, 'email', '');

          if (jMemberID && jUid && jEmail) {
            friends.push({
              friendUserID: jUserID,
              friendMemberID: jMemberID,
              friendUID: jUid,
              friendEmail: jEmail,
            });
          }
        }
      }

      array.push({
        refUserId: iUserID,
        refMemberID: iMemberID,
        refUID: iUid,
        friends: friends,
      });
    }

    // save
    for (let i = 0; i < array.length; i++) {
      const refMemberID = get(array[i], 'refMemberID');
      const refUID = get(array[i], 'refUID');
      const friends = get(array[i], 'friends');
      for (let j = 0; j < friends.length; j++) {
        const { friendMemberID, friendUID } = friends[j];
        if (refMemberID && refUID) {
          await this.referralService.createFriend({
            refMemid: refMemberID,
            refUid: refUID,
            friendMemid: friendMemberID,
            friendUid: friendUID,
          });
        }
      }
    }

    this.logger.debug('Completed to scan referrals');
  }

  // referral
  @Cron('*30 1 * * *')
  async handleCalculateCommision() {
    this.logger.debug('Called to calculate commisions');

    const commision = await this.referralService.getCommision();
    const commisionPercent = divide(get(commision, 'percent', 0), 100);
    const askOrderList = await this.peatioService.getOrders({
      type: 'OrderAsk',
      fromDate: subDays(new Date(), 1),
      status: 200,
    });
    const bidOrderList = await this.peatioService.getOrders({
      type: 'OrderBid',
      fromDate: subDays(new Date(), 1),
      status: 200,
    });

    for (let index = 0; index < askOrderList.length; index++) {
      this.logger.debug('Called to calculate commisions');
      const askOrder: Orders = askOrderList[index];
      const orderId: string = get(askOrder, 'id');
      const bidCurrencyId: string = get(askOrder, 'bid');
      const askMemberId = toNumber(get(askOrder, 'memberId'));
      const fundsRecieved = toNumber(get(askOrder, 'fundsReceived'));
      const makerFee = toNumber(get(askOrder, 'makerFee'));
      const calculatedCommision: number = times(
        fundsRecieved,
        makerFee,
        commisionPercent,
      );
      const askMember: Members = await this.peatioService.getMember(
        askMemberId,
      );
      const askUID: string = get(askMember, 'uid');
      const askInBarong: Users = await this.barongService.getUserByUID(askUID);
      const askReferralMemberId = toNumber(get(askInBarong, 'referralId'));

      if (askReferralMemberId > 0) {
        const referralUser = await this.barongService.getUserById(
          askReferralMemberId,
        );
        const referralUserId = get(referralUser, 'uid');
        const referralMemberId: number =
          await this.peatioService.getMemberIdByUid(referralUserId);

        await this.referralService.saveTracking({
          currencyId: bidCurrencyId,
          orderId: orderId,
          memberId: toString(askMemberId),
          referralId: toString(referralMemberId),
          type: 'maker',
          fundsReceived: toString(fundsRecieved),
          originLocked: null,
          locked: null,
          takerFee: null,
          makerFee: toString(makerFee),
          commisionPercent: commisionPercent,
          totalCommision: toString(calculatedCommision),
        });

        await this.peatioService.plusBalance(
          referralMemberId,
          bidCurrencyId,
          calculatedCommision,
        );
      }
    }

    for (let index = 0; index < bidOrderList.length; index++) {
      const bidOrder: Orders = bidOrderList[index];
      const orderId: string = get(bidOrder, 'id');
      const askCurrencyId: string = get(bidOrder, 'ask');
      const bidMemberId = toNumber(get(bidOrder, 'memberId'));
      const originVolumn = get(bidOrder, 'originVolume', 0);
      const volumn: number = get(bidOrder, 'volumn', 0);
      const takerFee = get(bidOrder, 'takerFee', 0);
      const calculatedCommision: number = times(
        minus(originVolumn, volumn),
        takerFee,
        commisionPercent,
      );
      const bidMember: Members = await this.peatioService.getMember(
        bidMemberId,
      );
      const bidUID: string = get(bidMember, 'uid');
      const bidInBarong: Users = await this.barongService.getUserByUID(bidUID);
      const bidReferralMemberId = toNumber(get(bidInBarong, 'referralId'));

      if (bidReferralMemberId > 0) {
        const referralUser = await this.barongService.getUserById(
          bidReferralMemberId,
        );
        const referralUserId = get(referralUser, 'uid');
        const referralMemberId: number =
          await this.peatioService.getMemberIdByUid(referralUserId);

        await this.referralService.saveTracking({
          currencyId: askCurrencyId,
          orderId: orderId,
          memberId: toString(bidMemberId),
          referralId: toString(referralMemberId),
          type: 'taker',
          fundsReceived: null,
          originLocked: toString(originVolumn),
          locked: toString(volumn),
          takerFee: toString(takerFee),
          makerFee: null,
          commisionPercent: commisionPercent,
          totalCommision: toString(calculatedCommision),
        });

        await this.peatioService.plusBalance(
          referralMemberId,
          askCurrencyId,
          calculatedCommision,
        );
      }
    }

    this.logger.debug('Completed to calculate commisions');
  }
}
