import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
    @IsInt()
    @IsNotEmpty()
    listingId: number;

    @IsInt()
    @IsNotEmpty()
    userId: number;
}
