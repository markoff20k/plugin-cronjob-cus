import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('commision', { schema: 'referral_production' })
export class Commision {
  @PrimaryGeneratedColumn({ type: 'tinyint', name: 'id' })
  id: number;

  @Column('float', { name: 'percent', precision: 12 })
  percent: number;

  @Column('varchar', { name: 'desktop_image', nullable: true, length: 255 })
  desktopImage: string | null;

  @Column('varchar', { name: 'mobile_image', nullable: true, length: 255 })
  mobileImage: string | null;
}
