import { Test, TestingModule } from '@nestjs/testing';
import { ListCategoryController } from './list-category.controller';
import { ListCategoryService } from './list-category.service';

describe('ListCategoryController', () => {
  let controller: ListCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListCategoryController],
      providers: [ListCategoryService],
    }).compile();

    controller = module.get<ListCategoryController>(ListCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
