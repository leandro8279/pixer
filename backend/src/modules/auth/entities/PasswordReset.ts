import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('password_resets')
export class PasswordReset {
  @PrimaryColumn({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  token: string;

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt: Date;
}
