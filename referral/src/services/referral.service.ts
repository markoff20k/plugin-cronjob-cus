import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { get } from 'lodash';
import { Commision } from 'src/shared/database/referral_production/entities/Commision';
import { Distributed } from 'src/shared/database/referral_production/entities/Distributed';
import { Friends } from 'src/shared/database/referral_production/entities/Friends';
import { Tracking } from 'src/shared/database/referral_production/entities/Tracking';
import { Repository } from 'typeorm';

@Injectable()
export class ReferralService {
  constructor(
    @InjectRepository(Commision, 'referralConnection')
    private readonly commisionRepository: Repository<Commision>,
    @InjectRepository(Tracking, 'referralConnection')
    private readonly trackingRepository: Repository<Tracking>,
    @InjectRepository(Friends, 'referralConnection')
    private readonly friendsRepository: Repository<Friends>,
    @InjectRepository(Distributed, 'referralConnection')
    private readonly distributedRepository: Repository<Distributed>,
  ) {}

  async getCommision() {
    return await this.commisionRepository.findOne({ where: { id: 1 } });
  }

  async saveTracking(props: {
    currencyId: string;
    orderId: string;
    memberId: string;
    referralId: string;
    type: string;
    originLocked: string | null;
    locked: string | null;
    takerFee: string | null;
    fundsReceived: string | null;
    makerFee: string | null;
    commisionPercent: number;
    totalCommision: string;
  }) {
    const tracking = new Tracking();

    tracking.currencyId = get(props, 'currencyId');
    tracking.orderId = get(props, 'orderId');
    tracking.memberId = get(props, 'memberId');
    tracking.referralId = get(props, 'referralId');
    tracking.type = get(props, 'type');
    tracking.originLocked = get(props, 'originLocked');
    tracking.locked = get(props, 'locked');
    tracking.makerFee = get(props, 'makerFee');
    tracking.takerFee = get(props, 'takerFee');
    tracking.commisionPercent = get(props, 'commisionPercent');
    tracking.totalCommision = get(props, 'totalCommision');
    tracking.scanAt = new Date();

    const errors = await validate(tracking);

    if (errors.length > 0) {
      throw new Error('Errors saving referral tracking');
    }

    return await this.trackingRepository.save(tracking);
  }

  async createFriend(props: {
    refMemid: number;
    refUid: string;
    friendMemid: number;
    friendUid: string;
  }) {
    const isFriended = await this.friendsRepository.findOne({
      where: {
        memberId: get(props, 'refMemid'),
        refId: get(props, 'friendMemid'),
      },
    });

    if (!isFriended) {
      const friend = new Friends();

      friend.memberId = get(props, 'refMemid');
      friend.uid = get(props, 'refUid');
      friend.refId = get(props, 'friendMemid');
      friend.refUid = get(props, 'friendUid');

      const errors = await validate(friend);

      if (errors.length > 0) {
        throw new Error('ERRORS Create friend');
      }

      return this.friendsRepository.save(friend);
    }
  }
}
