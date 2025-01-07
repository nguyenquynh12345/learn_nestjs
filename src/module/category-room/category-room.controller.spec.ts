import { Test, TestingModule } from '@nestjs/testing';
import { CategoryRoomController } from './category-room.controller';
import { CategoryRoomService } from './category-room.service';

describe('CategoryRoomController', () => {
  let controller: CategoryRoomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryRoomController],
      providers: [CategoryRoomService],
    }).compile();

    controller = module.get<CategoryRoomController>(CategoryRoomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
