import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryRoom } from './entities/category-room.entity';
import { CreateCategoryRoomDto } from './dto/create-category-room.dto';
import { UpdateCategoryRoomDto } from './dto/update-category-room.dto';

@Injectable()
export class CategoryRoomService {
  constructor(
    @InjectRepository(CategoryRoom)
    private categoryRoomRepository: Repository<CategoryRoom>,
  ) {}

  async create(
    createCategoryRoomDto: CreateCategoryRoomDto,
  ): Promise<CategoryRoom> {
    const categoryRoom = this.categoryRoomRepository.create(
      createCategoryRoomDto,
    );
    return this.categoryRoomRepository.save(categoryRoom);
  }

  async findAll(): Promise<CategoryRoom[]> {
    return this.categoryRoomRepository.find();
  }

  async findOne(id: number): Promise<CategoryRoom> {
    const categoryRoom = await this.categoryRoomRepository.findOne({
      where: { id },
    });
    if (!categoryRoom) throw new NotFoundException('CategoryRoom not found');
    return categoryRoom;
  }

  async update(
    id: number,
    updateCategoryRoomDto: UpdateCategoryRoomDto,
  ): Promise<CategoryRoom> {
    await this.categoryRoomRepository.update(id, updateCategoryRoomDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.categoryRoomRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('CategoryRoom not found');
  }
}
