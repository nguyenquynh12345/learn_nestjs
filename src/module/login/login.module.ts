// src/modules/login/login.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Đảm bảo User entity được kết nối
    JwtModule.register({
      secret: 'your-secret-key', // Sử dụng secret key của bạn (hoặc environment variable)
      signOptions: { expiresIn: '1h' }, // Thời gian hết hạn của token
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService], // (nếu sử dụng JwtStrategy để xác thực)
})
export class LoginModule { }
