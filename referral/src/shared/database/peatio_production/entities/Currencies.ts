import { Column, Entity, Index } from 'typeorm';

@Index('index_currencies_on_parent_id', ['parentId'], {})
@Index('index_currencies_on_position', ['position'], {})
@Index('index_currencies_on_visible', ['visible'], {})
@Entity('currencies', { schema: 'peatio_production' })
export class Currencies {
  @Column('varchar', { primary: true, name: 'id', length: 10 })
  id: string;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @Column('varchar', { name: 'homepage', nullable: true, length: 255 })
  homepage: string | null;

  @Column('varchar', { name: 'blockchain_key', nullable: true, length: 32 })
  blockchainKey: string | null;

  @Column('varchar', { name: 'parent_id', nullable: true, length: 255 })
  parentId: string | null;

  @Column('varchar', { name: 'type', length: 30, default: () => "'coin'" })
  type: string;

  @Column('decimal', {
    name: 'deposit_fee',
    precision: 34,
    scale: 18,
    default: () => "'0.000000000000000000'",
  })
  depositFee: string;

  @Column('decimal', {
    name: 'min_deposit_amount',
    precision: 34,
    scale: 18,
    default: () => "'0.000000000000000000'",
  })
  minDepositAmount: string;

  @Column('decimal', {
    name: 'min_collection_amount',
    precision: 34,
    scale: 18,
    default: () => "'0.000000000000000000'",
  })
  minCollectionAmount: string;

  @Column('decimal', {
    name: 'withdraw_fee',
    precision: 34,
    scale: 18,
    default: () => "'0.000000000000000000'",
  })
  withdrawFee: string;

  @Column('decimal', {
    name: 'min_withdraw_amount',
    precision: 34,
    scale: 18,
    default: () => "'0.000000000000000000'",
  })
  minWithdrawAmount: string;

  @Column('decimal', {
    name: 'withdraw_limit_24h',
    precision: 34,
    scale: 18,
    default: () => "'0.000000000000000000'",
  })
  withdrawLimit_24h: string;

  @Column('decimal', {
    name: 'withdraw_limit_72h',
    precision: 34,
    scale: 18,
    default: () => "'0.000000000000000000'",
  })
  withdrawLimit_72h: string;

  @Column('int', { name: 'position' })
  position: number;

  @Column('json', { name: 'options', nullable: true })
  options: object | null;

  @Column('tinyint', { name: 'visible', width: 1, default: () => "'1'" })
  visible: boolean;

  @Column('tinyint', {
    name: 'deposit_enabled',
    width: 1,
    default: () => "'1'",
  })
  depositEnabled: boolean;

  @Column('tinyint', {
    name: 'withdrawal_enabled',
    width: 1,
    default: () => "'1'",
  })
  withdrawalEnabled: boolean;

  @Column('bigint', { name: 'base_factor', default: () => "'1'" })
  baseFactor: string;

  @Column('tinyint', { name: 'precision', default: () => "'8'" })
  precision: number;

  @Column('varchar', { name: 'icon_url', nullable: true, length: 255 })
  iconUrl: string | null;

  @Column('decimal', {
    name: 'price',
    precision: 32,
    scale: 16,
    default: () => "'1.0000000000000000'",
  })
  price: string;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;
}
