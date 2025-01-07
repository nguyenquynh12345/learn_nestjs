import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { Room } from './entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room])], // Tích hợp Room entity
  controllers: [RoomController],
  providers: [RoomService],
  exports: [RoomService],
})
export class RoomModule {}
