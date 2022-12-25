import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index(
  'index_labels_on_user_id_and_key_and_scope',
  ['userId', 'key', 'scope'],
  { unique: true },
)
@Index('index_labels_on_user_id', ['userId'], {})
@Entity('labels', { schema: 'barong_production' })
export class Labels {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bigint', { name: 'user_id', unsigned: true })
  userId: string;

  @Column('varchar', { name: 'key', length: 255 })
  key: string;

  @Column('varchar', { name: 'value', length: 255 })
  value: string;

  @Column('varchar', { name: 'scope', length: 255, default: () => "'public'" })
  scope: string;

  @Column('varchar', { name: 'description', nullable: true, length: 255 })
  description: string | null;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;
}
