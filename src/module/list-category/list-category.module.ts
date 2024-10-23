import { Module } from '@nestjs/common';
import { ListCategoryService } from './list-category.service';
import { ListCategoryController } from './list-category.controller';

@Module({
  controllers: [ListCategoryController],
  providers: [ListCategoryService],
})
export class ListCategoryModule {}
