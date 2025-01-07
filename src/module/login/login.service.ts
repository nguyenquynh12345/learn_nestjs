// src/modules/login/login.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/create-login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService, // Inject JwtService để tạo JWT token
  ) { }

  // API login
  async login(loginDto: LoginDto): Promise<any> {
    const { userName, password } = loginDto;

    // Tìm người dùng theo tên tài khoản
    const user = await this.userRepository.findOne({ where: { userName } });
    if (!user) {
      throw new Error('Tài khoản không tồn tại');
    }

    // Kiểm tra nếu mật khẩu từ cơ sở dữ liệu và mật khẩu người dùng nhập vào hợp lệ
    if (!user.password || !password) {
      throw new Error('Dữ liệu mật khẩu không hợp lệ');
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Mật khẩu không chính xác');
    }

    // Tạo JWT token
    const payload = { userName: user.userName, sub: user.id };
    const token = this.jwtService.sign(payload);

    // Trả về thông tin người dùng và token
    return {
      data: {
        access_token: token,
        refresh_token: token,
      },
      message: null,
      statusCode: 1,
    };
  }
  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const { userName, password, email } = createUserDto;
    const existingUser = await this.userRepository.findOne({ where: { userName } });
    if (existingUser) return { code: 400, message: 'Tài khoản tồn tại', data: null };
    // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Tạo mới người dùng với mật khẩu đã mã hóa
    const newUser = this.userRepository.create({
      userName,
      password: hashedPassword,
      email,
    });

    // Lưu người dùng vào cơ sở dữ liệu
    return this.userRepository.save(newUser);
  }
}
