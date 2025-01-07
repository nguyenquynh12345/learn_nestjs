import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt'; // Thêm JwtModule
import { PassportModule } from '@nestjs/passport';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { JwtStrategy } from './jwt.strategy'; // Thêm JwtStrategy để xác thực token
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule, // Để sử dụng chiến lược xác thực Passport
    JwtModule.register({
      secret: '123456', // Khóa bí mật để giải mã token
      signOptions: { expiresIn: '1h' }, // Thời hạn của token
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService, JwtStrategy], // Thêm JwtStrategy vào provider
  exports: [JwtModule], // Export JwtModule để dùng trong module khác
})
export class LoginModule {}
