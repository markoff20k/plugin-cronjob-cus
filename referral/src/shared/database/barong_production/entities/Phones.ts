import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('index_phones_on_user_id', ['userId'], {})
@Index('index_phones_on_number_index', ['numberIndex'], {})
@Entity('phones', { schema: 'barong_production' })
export class Phones {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('int', { name: 'user_id', unsigned: true })
  userId: number;

  @Column('varchar', { name: 'country', length: 255 })
  country: string;

  @Column('varchar', { name: 'code', nullable: true, length: 5 })
  code: string | null;

  @Column('varchar', { name: 'number_encrypted', length: 255 })
  numberEncrypted: string;

  @Column('bigint', { name: 'number_index' })
  numberIndex: string;

  @Column('datetime', { name: 'validated_at', nullable: true })
  validatedAt: Date | null;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;
}
