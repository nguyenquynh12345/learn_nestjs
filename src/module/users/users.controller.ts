import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './users.service';
import { JwtAuthGuard } from '../login/jwt-auth.guard';
import { GetUserId } from 'src/decorators/get-user.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@GetUserId() id: number) {
    return this.userService.findOne(id);
  }
  @Get('/list')
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post('/create')
  async create(@Body() user: Partial<User>): Promise<User | string> {
    return this.userService.create(user);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() userData: Partial<User>,
  ): Promise<User> {

    return this.userService.update(id, userData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id); // Xóa người dùng
  }
}
