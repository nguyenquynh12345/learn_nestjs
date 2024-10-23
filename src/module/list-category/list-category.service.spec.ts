import { Test, TestingModule } from '@nestjs/testing';
import { ListCategoryService } from './list-category.service';

describe('ListCategoryService', () => {
  let service: ListCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListCategoryService],
    }).compile();

    service = module.get<ListCategoryService>(ListCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
