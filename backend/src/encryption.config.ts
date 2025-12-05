import { EncryptionTransformer } from 'typeorm-encrypted';
import { ConfigService } from '@nestjs/config';

const config = new ConfigService();

export const encryptionTransformer = new EncryptionTransformer({
  key: config.get<string>('ENCRYPTION_KEY')!,
  algorithm: 'aes-256-cbc',
  ivLength: 16,
});
