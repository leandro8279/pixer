import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('tax_classes')
export class TaxClass {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  country: string | null;

  @Column({ type: 'varchar', nullable: true })
  state: string | null;

  @Column({ type: 'varchar', nullable: true })
  zip: string | null;

  @Column({ type: 'varchar', nullable: true })
  city: string | null;

  @Column({ type: 'float' })
  rate: number;

  @Column({ type: 'varchar', nullable: true })
  name: string | null;

  @Column({ name: 'is_global', type: 'int', nullable: true })
  isGlobal: number | null;

  @Column({ type: 'int', nullable: true })
  priority: number | null;

  @Column({ name: 'on_shipping', type: 'boolean', default: true })
  onShipping: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
