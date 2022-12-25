import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('index_activities_on_user_id', ['userId'], {})
@Index('index_activities_on_target_uid', ['targetUid'], {})
@Entity('activities', { schema: 'barong_production' })
export class Activities {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bigint', { name: 'user_id' })
  userId: string;

  @Column('varchar', { name: 'target_uid', nullable: true, length: 255 })
  targetUid: string | null;

  @Column('varchar', { name: 'category', nullable: true, length: 255 })
  category: string | null;

  @Column('varchar', { name: 'user_ip', length: 255 })
  userIp: string;

  @Column('varchar', { name: 'user_ip_country', nullable: true, length: 255 })
  userIpCountry: string | null;

  @Column('varchar', { name: 'user_agent', length: 255 })
  userAgent: string;

  @Column('varchar', { name: 'topic', length: 255 })
  topic: string;

  @Column('varchar', { name: 'action', length: 255 })
  action: string;

  @Column('varchar', { name: 'result', length: 255 })
  result: string;

  @Column('text', { name: 'data', nullable: true })
  data: string | null;

  @Column('timestamp', { name: 'created_at', nullable: true })
  createdAt: Date | null;
}
