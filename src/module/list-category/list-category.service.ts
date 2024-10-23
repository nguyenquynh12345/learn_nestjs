import { Injectable } from '@nestjs/common';
import { CreateListCategoryDto } from './dto/create-list-category.dto';
import { UpdateListCategoryDto } from './dto/update-list-category.dto';

@Injectable()
export class ListCategoryService {
  create(createListCategoryDto: CreateListCategoryDto) {
    return 'This action adds a new listCategory';
  }

  findAll() {
    return `This action returns all listCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} listCategory`;
  }

  update(id: number, updateListCategoryDto: UpdateListCategoryDto) {
    return `This action updates a #${id} listCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} listCategory`;
  }
}
