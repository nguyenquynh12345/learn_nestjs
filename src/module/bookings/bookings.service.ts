import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, BookingStatus } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Listing } from '../listings/entities/listing.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
    @InjectRepository(Listing) private listingRepository: Repository<Listing>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  async create(createBookingDto: CreateBookingDto) {
    const { listingId, userId } = createBookingDto;

    const listing = await this.listingRepository.findOne({ where: { id: listingId } });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!listing || !user) {
      throw new Error('Listing or User not found');
    }

    const booking = this.bookingRepository.create({
      listing,
      user,
      status: BookingStatus.PENDING,
    });

    return await this.bookingRepository.save(booking);
  }

  async findAll() {
    return await this.bookingRepository.find({ relations: ['listing', 'user'] });
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    await this.bookingRepository.update(id, updateBookingDto);
    return this.bookingRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    return this.bookingRepository.delete(id);
  }
}
