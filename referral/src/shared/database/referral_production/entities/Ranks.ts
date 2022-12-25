import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ranks', { schema: 'referral_production' })
export class Ranks {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('bigint', { name: 'member_id', nullable: true })
  memberId: string | null;

  @Column('varchar', { name: 'uid', nullable: true, length: 32 })
  uid: string | null;

  @Column('varchar', { name: 'email', nullable: true, length: 255 })
  email: string | null;

  @Column('float', {
    name: 'total',
    nullable: true,
    precision: 12,
    default: () => "'0'",
  })
  total: number | null;

  @Column('varchar', { name: 'currency_id', nullable: true, length: 10 })
  currencyId: string | null;

  @Column('int', { name: 'rank', nullable: true })
  rank: number | null;
}
