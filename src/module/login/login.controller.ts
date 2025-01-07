// src/modules/login/login.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/create-login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.loginService.login(loginDto);
  }
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.loginService.createUser(createUserDto);
  }
}
