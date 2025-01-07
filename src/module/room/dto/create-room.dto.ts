import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  roomName: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  capacity: number;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsEnum(['available', 'unavailable'])
  status?: 'available' | 'unavailable';
}
