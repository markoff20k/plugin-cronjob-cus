import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('index_permissions_on_topic', ['topic'], {})
@Entity('permissions', { schema: 'barong_production' })
export class Permissions {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('varchar', { name: 'action', length: 255 })
  action: string;

  @Column('varchar', { name: 'role', length: 255 })
  role: string;

  @Column('varchar', { name: 'verb', length: 255 })
  verb: string;

  @Column('varchar', { name: 'path', length: 255 })
  path: string;

  @Column('varchar', { name: 'topic', nullable: true, length: 255 })
  topic: string | null;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;
}
