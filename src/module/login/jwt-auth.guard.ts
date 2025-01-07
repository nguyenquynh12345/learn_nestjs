// src/modules/login/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Lấy token từ header Authorization

    if (!token) {
      return false; // Nếu không có token, trả về false
    }

    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: '123456', // Cung cấp secret khi giải mã token
      });
      request.user = decoded; // Gán thông tin user vào request
      return true;
    } catch (e) {
      console.log(e);

      return false; // Nếu token không hợp lệ, trả về false
    }
  }
}
