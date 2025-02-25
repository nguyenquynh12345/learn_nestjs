import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Listing } from '../listings/entities/listing.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite) private favoriteRepository: Repository<Favorite>,
    @InjectRepository(Listing) private listingRepository: Repository<Listing>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  async create(createFavoriteDto: CreateFavoriteDto) {
    const { listingId, userId } = createFavoriteDto;

    const listing = await this.listingRepository.findOne({ where: { id: listingId } });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!listing || !user) {
      throw new Error('Listing or User not found');
    }

    const favorite = this.favoriteRepository.create({
      listing,
      user,
    });

    return await this.favoriteRepository.save(favorite);
  }

  async findAll() {
    return await this.favoriteRepository.find({ relations: ['listing', 'user'] });
  }
}
