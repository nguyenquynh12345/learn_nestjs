import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
    @IsInt()
    @IsNotEmpty()
    listingId: number;

    @IsInt()
    @IsNotEmpty()
    userId: number;

    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;

    @IsString()
    comment?: string;
}
