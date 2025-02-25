import { IsEnum } from 'class-validator';
import { BookingStatus } from '../entities/booking.entity';

export class UpdateBookingDto {
    @IsEnum(BookingStatus)
    status: BookingStatus;
}
