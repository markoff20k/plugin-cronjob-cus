import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('levels', { schema: 'barong_production' })
export class Levels {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('varchar', { name: 'key', length: 255 })
  key: string;

  @Column('varchar', { name: 'value', nullable: true, length: 255 })
  value: string | null;

  @Column('varchar', { name: 'description', nullable: true, length: 255 })
  description: string | null;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;
}
