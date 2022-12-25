import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferralService } from 'src/services/referral.service';
import { Users } from 'src/shared/database/barong_production/entities/Users';
import { Accounts } from 'src/shared/database/peatio_production/entities/Accounts';
import { Currencies } from 'src/shared/database/peatio_production/entities/Currencies';
import { Members } from 'src/shared/database/peatio_production/entities/Members';
import { Orders } from 'src/shared/database/peatio_production/entities/Orders';
import { Commision } from 'src/shared/database/referral_production/entities/Commision';
import { Distributed } from 'src/shared/database/referral_production/entities/Distributed';
import { Friends } from 'src/shared/database/referral_production/entities/Friends';
import { Ranks } from 'src/shared/database/referral_production/entities/Ranks';
import { Tracking } from 'src/shared/database/referral_production/entities/Tracking';
import { BarongService } from 'src/shared/services/barong.service';
import { PeatioService } from 'src/shared/services/peatio.service';
import { RanksService } from './ranks.service';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users], 'barongConnection'),
    TypeOrmModule.forFeature(
      [Members, Currencies, Orders, Currencies, Accounts],
      'peatioConnection',
    ),
    TypeOrmModule.forFeature(
      [Commision, Friends, Distributed, Ranks, Tracking],
      'referralConnection',
    ),
  ],
  providers: [
    TasksService,
    RanksService,
    PeatioService,
    ReferralService,
    BarongService,
  ],
})
export class TasksModule {}
