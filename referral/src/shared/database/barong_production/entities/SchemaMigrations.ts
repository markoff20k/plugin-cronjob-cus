import { Column, Entity } from 'typeorm';

@Entity('schema_migrations', { schema: 'barong_production' })
export class SchemaMigrations {
  @Column('varchar', { primary: true, name: 'version', length: 255 })
  version: string;
}
