export const encryptionTransformer = {
  key: process.env.ENCRYPTION_KEY!,
  algorithm: 'aes-256-gcm',
  ivLength: 16,
};
