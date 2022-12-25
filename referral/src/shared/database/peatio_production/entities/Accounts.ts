import { Column, Entity, Index } from 'typeorm';

@Index(
  'index_accounts_on_currency_id_and_member_id',
  ['currencyId', 'memberId'],
  { unique: true },
)
@Index('index_accounts_on_member_id', ['memberId'], {})
@Entity('accounts', { schema: 'peatio_production' })
export class Accounts {
  @Column('bigint', { primary: true, name: 'member_id' })
  memberId: string;

  @Column('varchar', { primary: true, name: 'currency_id', length: 10 })
  currencyId: string;

  @Column('decimal', {
    name: 'balance',
    precision: 34,
    scale: 18,
    default: () => "'0.000000000000000000'",
  })
  balance: string;

  @Column('decimal', {
    name: 'locked',
    precision: 34,
    scale: 18,
    default: () => "'0.000000000000000000'",
  })
  locked: string;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;
}
