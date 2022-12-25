import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('restrictions', { schema: 'barong_production' })
export class Restrictions {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('varchar', { name: 'category', length: 255 })
  category: string;

  @Column('varchar', { name: 'scope', length: 64 })
  scope: string;

  @Column('varchar', { name: 'value', length: 64 })
  value: string;

  @Column('int', { name: 'code', nullable: true })
  code: number | null;

  @Column('varchar', { name: 'state', length: 16, default: () => "'enabled'" })
  state: string;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;
}
