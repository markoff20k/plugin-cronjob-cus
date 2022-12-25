import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('index_apikeys_on_kid', ['kid'], { unique: true })
@Index(
  'idx_apikey_on_account',
  ['keyHolderAccountType', 'keyHolderAccountId'],
  {},
)
@Entity('apikeys', { schema: 'barong_production' })
export class Apikeys {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bigint', { name: 'key_holder_account_id', unsigned: true })
  keyHolderAccountId: string;

  @Column('varchar', {
    name: 'key_holder_account_type',
    length: 255,
    default: () => "'User'",
  })
  keyHolderAccountType: string;

  @Column('varchar', { name: 'kid', unique: true, length: 255 })
  kid: string;

  @Column('varchar', { name: 'algorithm', length: 255 })
  algorithm: string;

  @Column('varchar', { name: 'scope', nullable: true, length: 255 })
  scope: string | null;

  @Column('varchar', { name: 'secret_encrypted', nullable: true, length: 1024 })
  secretEncrypted: string | null;

  @Column('varchar', { name: 'state', length: 255, default: () => "'active'" })
  state: string;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;
}
