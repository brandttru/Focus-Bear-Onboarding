import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { encryptionTransformer } from './encryption.config';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'varchar',
    nullable: true,
    transformer: encryptionTransformer,
  })
  socialSecurityNumber: string;

  @Column({
    type: 'varchar',
    nullable: true,
    transformer: encryptionTransformer,
  })
  creditCardNumber: string;
}
