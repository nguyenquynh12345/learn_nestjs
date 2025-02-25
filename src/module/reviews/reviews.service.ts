import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { Listing } from '../listings/entities/listing.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    @InjectRepository(Listing) private listingRepository: Repository<Listing>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  async create(createReviewDto: CreateReviewDto) {
    const { listingId, userId, rating, comment } = createReviewDto;

    const listing = await this.listingRepository.findOne({ where: { id: listingId } });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!listing || !user) {
      throw new Error('Listing or User not found');
    }

    const review = this.reviewRepository.create({
      listing,
      user,
      rating,
      comment,
    });

    return await this.reviewRepository.save(review);
  }

  async findAll() {
    return await this.reviewRepository.find({ relations: ['listing', 'user'] });
  }
}
