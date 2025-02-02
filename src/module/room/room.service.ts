import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { UserService } from '../users/users.service';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    public usersService: UserService
  ) { }

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const room = this.roomRepository.create(createRoomDto);
    return this.roomRepository.save(room);
  }

  async findAll(page: number = 0, size: number = 10) {
    const safePage = Math.max(1, Number(page));
    const safeSize = Math.max(1, Number(size));

    const [rooms, total] = await this.roomRepository.findAndCount({
      take: safeSize,
      skip: (safePage - 1) * safeSize,
    });

    const data = await Promise.all(
      rooms.map(async (room) => {
        const user = await this.usersService.findOne(room.userId);
        return { ...room, user };
      }),
    );

    return {
      data,
      total,
      totalPages: Math.ceil(total / safeSize),
    };
  }

  async findOne(id: number): Promise<any> {
    const room = await this.roomRepository.findOne({ where: { id } });

    if (!room) throw new NotFoundException('Room not found');
    const user = await this.usersService.findOne(room.userId);
    return { ...room, user };
  }

  async update(id: number, updateRoomDto: UpdateRoomDto): Promise<Room> {
    await this.roomRepository.update(id, updateRoomDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.roomRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Room not found');
  }
}
