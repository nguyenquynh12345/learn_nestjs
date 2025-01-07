import { Test, TestingModule } from '@nestjs/testing';
import { CategoryRoomService } from './category-room.service';

describe('CategoryRoomService', () => {
  let service: CategoryRoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryRoomService],
    }).compile();

    service = module.get<CategoryRoomService>(CategoryRoomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
