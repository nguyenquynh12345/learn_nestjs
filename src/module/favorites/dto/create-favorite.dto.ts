import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateFavoriteDto {
    @IsInt()
    @IsNotEmpty()
    listingId: number;

    @IsInt()
    @IsNotEmpty()
    userId: number;
}
