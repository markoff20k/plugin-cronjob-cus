import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsSelect, Repository } from 'typeorm';
import { Users } from '../database/barong_production/entities/Users';
import { toString } from 'lodash';
@Injectable()
export class BarongService {
  constructor(
    @InjectRepository(Users, 'barongConnection')
    private readonly userRepository: Repository<Users>,
  ) {}

  async getUserById(id: number) {
    return await this.userRepository.findOne({ where: { id: toString(id) } });
  }

  async getUserByUID(uid: string) {
    return await this.userRepository.findOne({ where: { uid: uid } });
  }

  async getAllUsers(select?: FindOptionsSelect<Users>) {
    return await this.userRepository.find({
      select: select ?? ['id', 'uid', 'email', 'referralId'],
    });
  }
}
