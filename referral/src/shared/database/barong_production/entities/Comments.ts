import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('index_comments_on_user_id', ['userId'], {})
@Entity('comments', { schema: 'barong_production' })
export class Comments {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bigint', { name: 'user_id', unsigned: true })
  userId: string;

  @Column('varchar', { name: 'author_uid', length: 16 })
  authorUid: string;

  @Column('varchar', { name: 'title', length: 64 })
  title: string;

  @Column('text', { name: 'data' })
  data: string;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;
}
