import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class SearchListingDto {
    @IsOptional()
    @IsString()
    q?: string;

    @IsOptional()
    @IsString()
    price?: string; // Ví dụ: "100-500"

    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    location?: number; // location_id

    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    category?: number; // category_id

    @IsOptional()
    @IsBoolean()
    available?: boolean;

    @IsOptional()
    @IsBoolean()
    isApproved?: boolean;
}
