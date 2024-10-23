import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListCategoryService } from './list-category.service';
import { CreateListCategoryDto } from './dto/create-list-category.dto';
import { UpdateListCategoryDto } from './dto/update-list-category.dto';

@Controller('list-category')
export class ListCategoryController {
  constructor(private readonly listCategoryService: ListCategoryService) {}

  @Post()
  create(@Body() createListCategoryDto: CreateListCategoryDto) {
    return this.listCategoryService.create(createListCategoryDto);
  }

  @Get()
  findAll() {
    return this.listCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListCategoryDto: UpdateListCategoryDto) {
    return this.listCategoryService.update(+id, updateListCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listCategoryService.remove(+id);
  }
}
