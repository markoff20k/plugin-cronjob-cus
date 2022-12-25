import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('index_documents_on_user_id', ['userId'], {})
@Index('index_documents_on_doc_number_index', ['docNumberIndex'], {})
@Entity('documents', { schema: 'barong_production' })
export class Documents {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bigint', { name: 'user_id', unsigned: true })
  userId: string;

  @Column('varchar', { name: 'upload', nullable: true, length: 255 })
  upload: string | null;

  @Column('varchar', { name: 'doc_type', nullable: true, length: 255 })
  docType: string | null;

  @Column('date', { name: 'doc_expire', nullable: true })
  docExpire: string | null;

  @Column('varchar', {
    name: 'doc_number_encrypted',
    nullable: true,
    length: 255,
  })
  docNumberEncrypted: string | null;

  @Column('bigint', { name: 'doc_number_index', nullable: true })
  docNumberIndex: string | null;

  @Column('date', { name: 'doc_issue', nullable: true })
  docIssue: string | null;

  @Column('varchar', { name: 'doc_category', nullable: true, length: 255 })
  docCategory: string | null;

  @Column('varchar', { name: 'identificator', nullable: true, length: 255 })
  identificator: string | null;

  @Column('text', { name: 'metadata', nullable: true })
  metadata: string | null;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;
}
