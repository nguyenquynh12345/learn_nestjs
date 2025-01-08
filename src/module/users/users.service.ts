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
    // Kiểm tra độ dài tài khoản phải lớn hơn 5 ký tự
    if (user.userName && user.userName.length <= 5) {
      return {
        code: 400,
        message: 'Tài khoản phải có ít nhất 6 ký tự',
        data: null,
      };
    }

    const existingUser = await this.userRepository.findOne({
      where: { userName: user.userName },
    });

    if (existingUser) {
      return {
        code: 400,
        message: 'Tài khoản đã tồn tại',
        data: null,
      };
    }

    return await this.userRepository.save(user);
  }

<<<<<<< HEAD
  async update(id: number, userData: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userData.id },
    });
=======
  async update(id: any, userData: any): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id: userData.id },
    });;

>>>>>>> 57fcf3529d95e3b410c8c6faba9a1138ed9f43c1
    if (!user) {
      throw new Error('Người dùng không tồn tại');
    }

    // Cập nhật thông tin người dùng
    await this.userRepository.update(id, userData);

    // Trả về thông tin người dùng sau khi cập nhật
    return this.findOne(id);
  }

  async remove(id: number): Promise<any> {
    await this.userRepository.delete(id);
    return {
      code: 200,
      message: 'Xóa người dùng thành công',
      data: null,
    };
  }
}
