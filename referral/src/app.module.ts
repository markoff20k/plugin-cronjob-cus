import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Accounts } from './shared/database/peatio_production/entities/Accounts';
import { Currencies } from './shared/database/peatio_production/entities/Currencies';
import { Members } from './shared/database/peatio_production/entities/Members';
import { Commision } from './shared/database/referral_production/entities/Commision';
import { Distributed } from './shared/database/referral_production/entities/Distributed';
import { Friends } from './shared/database/referral_production/entities/Friends';
import { Ranks } from './shared/database/referral_production/entities/Ranks';
import { Tracking } from './shared/database/referral_production/entities/Tracking';
import { TasksModule } from './tasks/tasks.module';
import { Users } from './shared/database/barong_production/entities/Users';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_ENV_HOST,
      port: Number(process.env.MYSQL_ENV_PORT) || 3306,
      username: process.env.MYSQL_ENV_USER,
      password: process.env.MYSQL_ENV_PASSWORD,
      synchronize: false,
      database: 'referral_production',
      name: 'referralConnection',
      entities: [Commision, Distributed, Friends, Ranks, Tracking],
      autoLoadEntities: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_ENV_HOST,
      port: Number(process.env.MYSQL_ENV_PORT) || 3306,
      username: process.env.MYSQL_ENV_USER,
      password: process.env.MYSQL_ENV_PASSWORD,
      synchronize: false,
      database: 'barong_production',
      name: 'barongConnection',
      entities: [Users],
      autoLoadEntities: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_ENV_HOST,
      port: Number(process.env.MYSQL_ENV_PORT) || 3306,
      username: process.env.MYSQL_ENV_USER,
      password: process.env.MYSQL_ENV_PASSWORD,
      synchronize: false,
      database: 'peatio_production',
      name: 'peatioConnection',
      entities: [Members, Accounts, Currencies],
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
