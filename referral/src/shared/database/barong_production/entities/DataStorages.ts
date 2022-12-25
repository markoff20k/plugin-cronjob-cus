import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('index_data_storages_on_user_id_and_title', ['userId', 'title'], {
  unique: true,
})
@Entity('data_storages', { schema: 'barong_production' })
export class DataStorages {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bigint', { name: 'user_id', unsigned: true })
  userId: string;

  @Column('varchar', { name: 'title', length: 64 })
  title: string;

  @Column('text', { name: 'data' })
  data: string;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;
}
