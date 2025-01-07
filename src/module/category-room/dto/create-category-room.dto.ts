import { IsString, IsOptional } from 'class-validator';

export class CreateCategoryRoomDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
