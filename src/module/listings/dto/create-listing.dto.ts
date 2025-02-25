import { IsNotEmpty, IsOptional, IsString, IsNumber, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
class ImageDto {
    @IsString()
    @IsNotEmpty()
    url: string;
}
export class CreateListingDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsNumber()
    area?: number;
    @IsOptional()
    @IsString()
    location?: number;

    @IsOptional()
    @IsNumber()
    categories?: number;
    @IsOptional()
    @IsBoolean()
    available?: boolean;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ImageDto)
    images: ImageDto[];

    @IsOptional()
    @IsBoolean()
    isApproved?: boolean;
}
