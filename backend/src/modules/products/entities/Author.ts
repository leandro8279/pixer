import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('authors')
export class Author {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ name: 'is_approved', type: 'boolean', default: false })
  isApproved: boolean;

  @Column({ type: 'json', nullable: true })
  image: Record<string, unknown> | null;

  @Column({ name: 'cover_image', type: 'json', nullable: true })
  coverImage: Record<string, unknown> | null;

  @Column({ type: 'varchar' })
  slug: string;

  @Column({ type: 'text', nullable: true })
  bio: string | null;

  @Column({ type: 'text', nullable: true })
  quote: string | null;

  @Column({ type: 'varchar', nullable: true })
  born: string | null;

  @Column({ type: 'varchar', nullable: true })
  death: string | null;

  @Column({ type: 'varchar', nullable: true })
  languages: string | null;

  @Column({ type: 'json', nullable: true })
  socials: Record<string, unknown> | null;

  @Column({ type: 'varchar', nullable: true })
  language: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
