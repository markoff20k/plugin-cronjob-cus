import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('index_users_on_uid', ['uid'], { unique: true })
@Index('index_users_on_email', ['email'], { unique: true })
@Index('index_users_on_username', ['username'], { unique: true })
@Entity('users', { schema: 'barong_production' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('varchar', { name: 'uid', unique: true, length: 255 })
  uid: string;

  @Column('varchar', {
    name: 'username',
    nullable: true,
    unique: true,
    length: 255,
  })
  username: string | null;

  @Column('varchar', { name: 'email', unique: true, length: 255 })
  email: string;

  @Column('varchar', { name: 'password_digest', length: 255 })
  passwordDigest: string;

  @Column('varchar', { name: 'role', length: 255, default: () => "'member'" })
  role: string;

  @Column('text', { name: 'data', nullable: true })
  data: string | null;

  @Column('int', { name: 'level', default: () => "'0'" })
  level: number;

  @Column('tinyint', {
    name: 'otp',
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  otp: boolean | null;

  @Column('varchar', { name: 'state', length: 255, default: () => "'pending'" })
  state: string;

  @Column('bigint', { name: 'referral_id', nullable: true })
  referralId: string | null;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;
}
