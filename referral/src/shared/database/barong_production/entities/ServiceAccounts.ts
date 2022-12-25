import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('service_accounts', { schema: 'barong_production' })
export class ServiceAccounts {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('varchar', { name: 'uid', length: 255 })
  uid: string;

  @Column('bigint', { name: 'owner_id', nullable: true, unsigned: true })
  ownerId: string | null;

  @Column('varchar', { name: 'email', length: 255 })
  email: string;

  @Column('varchar', {
    name: 'role',
    length: 255,
    default: () => "'service_account'",
  })
  role: string;

  @Column('int', { name: 'level', default: () => "'0'" })
  level: number;

  @Column('varchar', { name: 'state', length: 255, default: () => "'pending'" })
  state: string;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;
}
