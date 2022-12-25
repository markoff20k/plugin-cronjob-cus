import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('distributed', { schema: 'referral_production' })
export class Distributed {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('bigint', { name: 'member_id' })
  memberId: string;

  @Column('varchar', { name: 'currency_id', length: 10 })
  currencyId: string;

  @Column('decimal', {
    name: 'amount',
    precision: 34,
    scale: 18,
    default: () => "'0.000000000000000000'",
  })
  amount: string;

  @Column('datetime', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('datetime', {
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
