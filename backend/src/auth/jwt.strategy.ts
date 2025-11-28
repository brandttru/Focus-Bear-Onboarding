import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET!, // Your secret or public key
    });
  }

  async validate(payload: any) {
    // payload contains the decoded JWT payload (e.g., userId, roles)
    return {
      userId: payload.sub,
      username: payload.username,
      roles: payload.roles,
    };
  }
}
