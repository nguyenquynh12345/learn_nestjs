import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CategoryRoomService } from './category-room.service';
import { CreateCategoryRoomDto } from './dto/create-category-room.dto';
import { UpdateCategoryRoomDto } from './dto/update-category-room.dto';

@Controller('category-rooms')
export class CategoryRoomController {
  constructor(private readonly categoryRoomService: CategoryRoomService) {}

  @Post()
  create(@Body() createCategoryRoomDto: CreateCategoryRoomDto) {
    return this.categoryRoomService.create(createCategoryRoomDto);
  }

  @Get()
  findAll() {
    return this.categoryRoomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoryRoomService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCategoryRoomDto: UpdateCategoryRoomDto,
  ) {
    return this.categoryRoomService.update(id, updateCategoryRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoryRoomService.remove(id);
  }
}
