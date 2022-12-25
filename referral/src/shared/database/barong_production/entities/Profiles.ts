import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('index_profiles_on_user_id', ['userId'], {})
@Entity('profiles', { schema: 'barong_production' })
export class Profiles {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bigint', { name: 'user_id', nullable: true })
  userId: string | null;

  @Column('varchar', { name: 'author', nullable: true, length: 255 })
  author: string | null;

  @Column('varchar', { name: 'applicant_id', nullable: true, length: 255 })
  applicantId: string | null;

  @Column('varchar', {
    name: 'first_name_encrypted',
    nullable: true,
    length: 1024,
  })
  firstNameEncrypted: string | null;

  @Column('varchar', {
    name: 'last_name_encrypted',
    nullable: true,
    length: 1024,
  })
  lastNameEncrypted: string | null;

  @Column('varchar', { name: 'dob_encrypted', nullable: true, length: 255 })
  dobEncrypted: string | null;

  @Column('varchar', {
    name: 'address_encrypted',
    nullable: true,
    length: 1024,
  })
  addressEncrypted: string | null;

  @Column('varchar', { name: 'postcode', nullable: true, length: 255 })
  postcode: string | null;

  @Column('varchar', { name: 'city', nullable: true, length: 255 })
  city: string | null;

  @Column('varchar', { name: 'country', nullable: true, length: 255 })
  country: string | null;

  @Column('tinyint', {
    name: 'state',
    nullable: true,
    unsigned: true,
    default: () => "'0'",
  })
  state: number | null;

  @Column('text', { name: 'metadata', nullable: true })
  metadata: string | null;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;
}
