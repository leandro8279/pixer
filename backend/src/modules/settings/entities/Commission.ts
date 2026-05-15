import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('commissions')
export class Commission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  level: string;

  @Column({ name: 'sub_level', type: 'varchar' })
  subLevel: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'min_balance', type: 'int' })
  minBalance: number;

  @Column({ name: 'max_balance', type: 'varchar' })
  maxBalance: string;

  @Column({ type: 'float' })
  commission: number;

  @Column({ type: 'json', nullable: true })
  image: Record<string, unknown> | null;

  @Column({ type: 'varchar' })
  language: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
