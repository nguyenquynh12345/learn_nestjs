// src/modules/login/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Lấy token từ header
      ignoreExpiration: false,
      secretOrKey: '123456', // Khóa bí mật để giải mã token
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username }; // Trả về thông tin user từ token
  }
}
