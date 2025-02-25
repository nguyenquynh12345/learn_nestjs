import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository extends Repository<User> {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }
}
