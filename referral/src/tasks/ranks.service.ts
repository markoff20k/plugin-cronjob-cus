import { validate } from 'class-validator';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { Members } from 'src/shared/database/peatio_production/entities/Members';
import { Currencies } from 'src/shared/database/peatio_production/entities/Currencies';
import { Distributed } from 'src/shared/database/referral_production/entities/Distributed';
import { Friends } from 'src/shared/database/referral_production/entities/Friends';
import { Ranks } from 'src/shared/database/referral_production/entities/Ranks';
import { get, toNumber, toString, toUpper } from 'lodash';
import NP from 'number-precision';
import { PeatioService } from 'src/shared/services/peatio.service';

const DEFAULT_CONVERTED_CURRENCY = 'usdt';
NP.enableBoundaryChecking(false);

interface Rank {
  memberId: number;
  total: number;
}
interface FriendCount {
  memberId: number;
  totalFriends: number;
}

@Injectable()
export class RanksService {
  private readonly logger = new Logger(RanksService.name);

  constructor(
    @InjectRepository(Members, 'peatioConnection')
    private readonly membersRepository: Repository<Members>,
    @InjectRepository(Distributed, 'referralConnection')
    private readonly distributedRepository: Repository<Distributed>,
    @InjectRepository(Friends, 'referralConnection')
    private readonly friendsRepository: Repository<Friends>,
    @InjectRepository(Ranks, 'referralConnection')
    private readonly ranksRepository: Repository<Ranks>,

    readonly peatioService: PeatioService,
  ) {}

  async getPrice(currencyId: string): Promise<number> {
    const currency: Currencies = await this.peatioService.getCurrency(
      currencyId,
    );
    const price: string = get(currency, 'price');

    if (!price || toNumber(price) <= 0) {
      throw new Error(`${toUpper(currencyId)} price is must greater than 0`);
    }

    return toNumber(price);
  }

  async getRanksByCommisions(): Promise<Rank[]> {
    const ranks: Rank[] = [];
    const distributeds: Distributed[] = await this.distributedRepository.find();

    for (let index = 0; index < distributeds.length; index++) {
      const distributed: Distributed = distributeds[index];
      const memberId: string = get(distributed, 'memberId', '');
      const currencyId: string = get(distributed, 'currencyId', '');
      const amount: string = get(distributed, 'amount', '');

      let total: number = toNumber(amount);

      if (currencyId !== DEFAULT_CONVERTED_CURRENCY) {
        const price: number = await this.getPrice(currencyId);
        total = NP.times(toNumber(price), toNumber(amount));
      }

      const rankIndex: number = ranks.findIndex(
        (rank: Rank) => rank.memberId === toNumber(memberId),
      );

      if (rankIndex >= 0) {
        ranks[rankIndex].total = NP.times(
          toNumber(ranks[rankIndex].total),
          toNumber(total),
        );
      } else {
        ranks.push({
          memberId: toNumber(memberId),
          total: toNumber(total),
        });
      }
    }

    return ranks;
  }

  async getRanksByFriends(): Promise<FriendCount[]> {
    const friends: FriendCount[] = await this.friendsRepository
      .createQueryBuilder('friend')
      .select('friend.member_id AS memberId')
      .addSelect('COUNT(*) AS totalFriends')
      .groupBy('friend.member_id')
      .getRawMany();

    const sortedFriends: FriendCount[] = friends.sort(
      (first, second) => second.totalFriends - first.totalFriends,
    );

    return sortedFriends;
  }

  async updateRanksWithFriends(ranks: FriendCount[]): Promise<void> {
    for (let index = 1; index <= ranks.length; index++) {
      const rank: FriendCount = ranks[index - 1];
      const memberId: number = get(rank, 'memberId');
      const totalFriends: number = get(rank, 'totalFriends', 0);
      const rankCount: number = await this.ranksRepository.count({
        where: { memberId: toString(memberId) },
      });

      // if rank not exist
      if (rankCount <= 0) {
        const member: Members = await this.membersRepository.findOne({
          where: { id: toString(memberId) },
        });
        const uid: string = get(member, 'uid', '');
        const email: string = get(member, 'email', '');

        await this.ranksRepository.create({
          memberId: toString(memberId),
          uid: uid,
          email: email,
          total: totalFriends,
          rank: index,
          currencyId: '',
        });
      } else {
        await this.ranksRepository.update(
          { memberId: toString(memberId) },
          {
            total: totalFriends,
            rank: index,
            currencyId: '',
          },
        );
      }
    }
  }

  async updateRanksWithCommisions(ranks: Rank[]) {
    for (let index = 1; index <= ranks.length; index++) {
      const rank: Rank = ranks[index - 1];
      const memberId: number = get(rank, 'memberId');
      const total: number = get(rank, 'total');
      const rankUpdate: Ranks = await this.ranksRepository.findOne({
        where: { memberId: toString(memberId) },
      });
      const member: Members = await this.membersRepository.findOne({
        where: { id: toString(memberId) },
      });
      const uid: string = get(member, 'uid');
      const email: string = get(member, 'email');

      if (rankUpdate) {
        await this.ranksRepository.update(
          { memberId: toString(memberId) },
          { total: total, rank: index, currencyId: DEFAULT_CONVERTED_CURRENCY },
        );
      } else {
        const newRank = new Ranks();
        newRank.memberId = toString(memberId);
        newRank.email = email;
        newRank.uid = uid;
        newRank.total = total;
        newRank.rank = index;
        newRank.currencyId = DEFAULT_CONVERTED_CURRENCY;

        const errors = await validate(newRank);

        if (errors.length <= 0) {
          await this.ranksRepository.save(newRank);
        }
      }
    }
  }

  @Cron('*45 1 * * *')
  async scanRanks(): Promise<void> {
    try {
      this.logger.debug('Called scan ranks');

      const commisionRanks: Rank[] = await this.getRanksByCommisions();

      // reset ranks
      await this.ranksRepository.update(
        {},
        { rank: 1000000000, currencyId: '', total: 0 },
      );

      const ranks: Rank[] = commisionRanks.sort((rankA, rankB) => {
        return rankB.total - rankA.total;
      });

      await this.updateRanksWithCommisions(ranks);

      this.logger.debug('Finished scan ranks');
    } catch (error) {
      this.logger.error(JSON.stringify(error.message));
    }
  }
}
