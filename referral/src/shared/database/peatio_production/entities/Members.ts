import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('index_members_on_email', ['email'], { unique: true })
@Index('index_members_on_uid', ['uid'], { unique: true })
@Index('index_members_on_username', ['username'], { unique: true })
@Entity('members', { schema: 'peatio_production' })
export class Members {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('varchar', { name: 'uid', unique: true, length: 32 })
  uid: string;

  @Column('varchar', { name: 'email', unique: true, length: 255 })
  email: string;

  @Column('int', { name: 'level' })
  level: number;

  @Column('varchar', { name: 'role', length: 16 })
  role: string;

  @Column('varchar', { name: 'group', length: 32, default: () => "'vip-0'" })
  group: string;

  @Column('varchar', { name: 'state', length: 16 })
  state: string;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Column('varchar', {
    name: 'username',
    nullable: true,
    unique: true,
    length: 255,
  })
  username: string | null;
}
