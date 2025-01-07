import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRoomService } from './category-room.service';
import { CategoryRoomController } from './category-room.controller';
import { CategoryRoom } from './entities/category-room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryRoom])], // Đăng ký entity CategoryRoom
  controllers: [CategoryRoomController],
  providers: [CategoryRoomService],
})
export class CategoryRoomModule {}
