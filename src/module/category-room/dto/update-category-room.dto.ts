import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryRoomDto } from './create-category-room.dto';

export class UpdateCategoryRoomDto extends PartialType(CreateCategoryRoomDto) {}
