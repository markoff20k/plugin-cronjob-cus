import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('index_orders_on_uuid', ['uuid'], { unique: true })
@Index('index_orders_on_member_id', ['memberId'], {})
@Index('index_orders_on_state', ['state'], {})
@Index(
  'index_orders_on_type_and_state_and_member_id',
  ['type', 'state', 'memberId'],
  {},
)
@Index(
  'index_orders_on_type_and_state_and_market_id',
  ['type', 'state', 'marketId'],
  {},
)
@Index('index_orders_on_type_and_market_id', ['type', 'marketId'], {})
@Index('index_orders_on_type_and_member_id', ['type', 'memberId'], {})
@Index('index_orders_on_updated_at', ['updatedAt'], {})
@Entity('orders', { schema: 'peatio_production' })
export class Orders {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('varbinary', { name: 'uuid', unique: true, length: 16 })
  uuid: Buffer;

  @Column('varchar', { name: 'remote_id', nullable: true, length: 255 })
  remoteId: string | null;

  @Column('varchar', { name: 'bid', length: 10 })
  bid: string;

  @Column('varchar', { name: 'ask', length: 10 })
  ask: string;

  @Column('varchar', { name: 'market_id', length: 20 })
  marketId: string;

  @Column('decimal', {
    name: 'price',
    nullable: true,
    precision: 32,
    scale: 16,
  })
  price: string | null;

  @Column('decimal', { name: 'volume', precision: 32, scale: 16 })
  volume: string;

  @Column('decimal', { name: 'origin_volume', precision: 32, scale: 16 })
  originVolume: string;

  @Column('decimal', {
    name: 'maker_fee',
    precision: 17,
    scale: 16,
    default: () => "'0.0000000000000000'",
  })
  makerFee: string;

  @Column('decimal', {
    name: 'taker_fee',
    precision: 17,
    scale: 16,
    default: () => "'0.0000000000000000'",
  })
  takerFee: string;

  @Column('int', { name: 'state' })
  state: number;

  @Column('varchar', { name: 'type', length: 8 })
  type: string;

  @Column('bigint', { name: 'member_id' })
  memberId: string;

  @Column('varchar', { name: 'ord_type', length: 30 })
  ordType: string;

  @Column('decimal', {
    name: 'locked',
    precision: 32,
    scale: 16,
    default: () => "'0.0000000000000000'",
  })
  locked: string;

  @Column('decimal', {
    name: 'origin_locked',
    precision: 32,
    scale: 16,
    default: () => "'0.0000000000000000'",
  })
  originLocked: string;

  @Column('decimal', {
    name: 'funds_received',
    nullable: true,
    precision: 32,
    scale: 16,
    default: () => "'0.0000000000000000'",
  })
  fundsReceived: string | null;

  @Column('int', { name: 'trades_count', default: () => "'0'" })
  tradesCount: number;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;
}
