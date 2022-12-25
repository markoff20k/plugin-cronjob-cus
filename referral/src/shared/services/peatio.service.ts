import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { toLower, toNumber, toString, get, toUpper } from 'lodash';
import { Accounts } from 'src/shared/database/peatio_production/entities/Accounts';
import { Currencies } from 'src/shared/database/peatio_production/entities/Currencies';
import { Members } from 'src/shared/database/peatio_production/entities/Members';
import { FindOptionsSelect, Repository } from 'typeorm';
import { Orders } from '../database/peatio_production/entities/Orders';

@Injectable()
export class PeatioService {
  constructor(
    @InjectRepository(Members, 'peatioConnection')
    private readonly membersRepository: Repository<Members>,
    @InjectRepository(Accounts, 'peatioConnection')
    private readonly accountsRepository: Repository<Accounts>,
    @InjectRepository(Currencies, 'peatioConnection')
    private readonly currenciesRepository: Repository<Currencies>,
    @InjectRepository(Orders, 'peatioConnection')
    private readonly ordersRepository: Repository<Orders>,
  ) {}

  async getMemberIdByUid(uid: string): Promise<number> {
    if (!uid) {
      throw new Error('uid is invalid');
    }

    const member = await this.membersRepository.findOne({
      where: { uid: uid },
    });

    if (!member || toNumber(member.id) <= 0) {
      throw new Error(`uid: ${uid} - member is invalid`);
    }

    return toNumber(member.id);
  }

  async getMember(memberId: number) {
    if (!memberId) {
      throw new Error(`memberId: ${memberId} - is invalid`);
    }

    const member = await this.membersRepository.findOne({
      where: {
        id: toString(memberId),
      },
    });

    if (!member || toNumber(member.id) <= 0) {
      throw new Error(`member: ${JSON.stringify(member)} - member is invalid`);
    }

    return member;
  }

  async getAllMembers(select?: FindOptionsSelect<Members>) {
    return await this.membersRepository.find({
      select: select ?? ['id', 'uid', 'email'],
    });
  }

  async getBalance(memberId: number, currencyId: string) {
    if (!memberId) {
      throw new Error(`member_id: ${memberId} is invalid`);
    }

    const wallet = await this.accountsRepository.findOne({
      where: {
        memberId: toString(memberId),
        currencyId: toLower(currencyId),
      },
    });

    if (!wallet) {
      await this.generateWallet(memberId, currencyId);
      return 0;
    }

    return toNumber(wallet.balance);
  }

  async generateWallet(memberId: number, currencyId: string) {
    await this.getMember(memberId);
    await this.getCurrency(currencyId);

    const newWallet = new Accounts();
    newWallet.memberId = toString(memberId);
    newWallet.currencyId = currencyId;
    newWallet.balance = '0';
    newWallet.locked = '0';
    newWallet.createdAt = new Date();
    newWallet.updatedAt = new Date();

    const errors = await validate(newWallet);
    if (errors.length > 0) {
      throw new Error('generate_wallet is failed');
    }

    return await this.accountsRepository.save({ ...newWallet });
  }

  async getCurrency(currencyId: string) {
    if (!currencyId) {
      throw new Error(`${toUpper(currencyId)} is not-found`);
    }

    const currency = await this.currenciesRepository.findOne({
      where: { id: toLower(currencyId) },
    });

    if (!currency) {
      throw new Error(`${toUpper(currencyId)} is not-found`);
    }

    return currency;
  }

  async plusBalance(memberId: number, currencyId: string, amount: number) {
    if (!amount) {
      throw new Error('amount is invalid');
    }

    await this.getMember(memberId);
    await this.getCurrency(currencyId);
    await this.getBalance(memberId, currencyId);
    await this.accountsRepository.increment(
      { memberId: toString(memberId), currencyId: toLower(currencyId) },
      'balance',
      amount,
    );
  }

  async getOrders(props: { type?: string; fromDate?: Date; status?: number }) {
    const type: string | false = get(props, 'type', false);
    const fromDate: Date | false = get(props, 'fromDate', false);
    const status: number | false = get(props, 'status', false);

    if (type && fromDate && status) {
      return await this.ordersRepository.find({
        where: {
          type: type,
          state: status,
          updatedAt: fromDate,
        },
      });
    }

    return await this.ordersRepository.find();
  }
}
