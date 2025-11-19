import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { encryptionTransformer } from './encryption.config';
import { EncryptionTransformer } from 'typeorm-encrypted';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'varchar',
    nullable: true,
    transformer: new EncryptionTransformer(encryptionTransformer),
  })
  socialSecurityNumber: string;

  @Column({
    type: 'varchar',
    nullable: true,
    transformer: new EncryptionTransformer(encryptionTransformer),
  })
  creditCardNumber: string;
}
