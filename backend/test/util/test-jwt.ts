import * as jwt from 'jsonwebtoken';

export function generateTestJwt(payload: object): string {
  const secret = process.env.JWT_SECRET || 'test-secret';

  return jwt.sign(payload, secret, { expiresIn: '1h' });
}
