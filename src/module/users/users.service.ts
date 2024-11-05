import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async create(user: Partial<User>): Promise<User | any> {
    if (user.userName.length > 5) {
      return {
        code: 400,
        message: 'Tài khoản không được nhở hơn 5 ký tự',
        data: null,
      };
    }
    const check = await this.userRepository.findOne({
      where: {
        userName: user.userName,
      },
    });
    if (check) {
      return {
        code: 400,
        message: 'Tài khoản đã tồn tại',
        data: null,
      };
    }
    return await this.userRepository.save(user);
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, userData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
