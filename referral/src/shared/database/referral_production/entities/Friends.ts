import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('friends', { schema: 'referral_production' })
export class Friends {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bigint', { primary: true, name: 'member_id' })
  memberId: number;

  @Column('varchar', { name: 'uid', length: 32 })
  uid: string;

  @Column('bigint', { primary: true, name: 'ref_id' })
  refId: number;

  @Column('varchar', { name: 'ref_uid', length: 20 })
  refUid: string;

  @Column('datetime', { name: 'time', default: () => 'CURRENT_TIMESTAMP' })
  time: Date;
}
