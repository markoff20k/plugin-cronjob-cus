import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tracking', { schema: 'referral_production' })
export class Tracking {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('varchar', { name: 'currency_id', length: 10 })
  currencyId: string;

  @Column('bigint', { primary: true, name: 'order_id' })
  orderId: string;

  @Column('bigint', { name: 'member_id' })
  memberId: string;

  @Column('bigint', { primary: true, name: 'referral_id' })
  referralId: string;

  @Column('varchar', { name: 'type', length: 45 })
  type: string;

  @Column('decimal', {
    name: 'origin_locked',
    nullable: true,
    precision: 32,
    scale: 16,
  })
  originLocked: string | null;

  @Column('decimal', {
    name: 'locked',
    nullable: true,
    precision: 32,
    scale: 16,
  })
  locked: string | null;

  @Column('decimal', {
    name: 'taker_fee',
    nullable: true,
    precision: 17,
    scale: 16,
  })
  takerFee: string | null;

  @Column('decimal', {
    name: 'funds_received',
    nullable: true,
    precision: 32,
    scale: 16,
  })
  fundsReceived: string | null;

  @Column('decimal', {
    name: 'maker_fee',
    nullable: true,
    unsigned: true,
    precision: 17,
    scale: 16,
  })
  makerFee: string | null;

  @Column('float', { name: 'commision_percent', precision: 12 })
  commisionPercent: number;

  @Column('decimal', { name: 'total_commision', precision: 32, scale: 16 })
  totalCommision: string;

  @Column('datetime', { name: 'scan_at', default: () => 'CURRENT_TIMESTAMP' })
  scanAt: Date;
}
