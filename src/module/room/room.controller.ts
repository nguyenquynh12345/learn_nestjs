import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) { }

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Get('')
  async findAll(
    @Query('page') page: number = 0,
    @Query('size') size: number = 10,
  ) {
    return this.roomService.findAll(Number(page), Number(size));
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.roomService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.roomService.remove(id);
  }
}
