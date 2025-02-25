import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { Listing } from './entities/listing.entity';
import { UsersService } from '../users/users.service';
import { LocationsService } from '../locations/locations.service';
import { CategoriesService } from '../categories/categories.service';
import { User } from '../users/entities/user.entity';
import { Category } from '../categories/entities/category.entity';
import { Location } from '../locations/entities/location.entity';
import { Image } from '../images/entities/image.entity';
import { SearchListingDto } from '../search/dto/create-search.dto';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing)
    private listingsRepository: Repository<Listing>,

    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,

    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) { }

  async createListing(dto: CreateListingDto) {
    const user = await this.userRepository.findOne({ where: { id: dto.userId } });
    if (!user) throw new BadRequestException('User không tồn tại');

    const location = await this.locationsRepository.findOne({ where: { id: dto.location } });
    if (!location) throw new BadRequestException('Location không tồn tại');

    const category = await this.categoriesRepository.findOne({ where: { id: dto.categories } });
    if (!category) throw new BadRequestException('Category không tồn tại');

    const newListing = this.listingsRepository.create({
      title: dto.title,
      description: dto.description,
      price: dto.price,
      address: dto.address,
      area: dto.area,
      available: dto.available,
      isApproved: false,
      user,
      location,
      category,
    });

    const savedListing = await this.listingsRepository.save(newListing);

    if (dto.images && dto.images.length > 0) {
      const images = dto.images.map(img =>
        this.imageRepository.create({ url: img.url, listing: savedListing })
      );
      await this.imageRepository.save(images);
    }

    return savedListing;
  }
  async approveListing(id: number): Promise<Listing> {
    const listing = await this.listingsRepository.findOne({ where: { id } });
    if (!listing) throw new NotFoundException('Listing không tồn tại');

    listing.isApproved = true;
    return await this.listingsRepository.save(listing);
  }
  async findAll(): Promise<Listing[]> {
    return this.listingsRepository.find({ where: { isApproved: true }, relations: ['user', 'images'] });
  }
  async getListUnapproved(): Promise<Listing[]> {
    return this.listingsRepository.find({ where: { isApproved: false }, relations: ['user', 'images'] });
  }
  async findOne(id: number): Promise<Listing> {
    const listing = await this.listingsRepository.findOne({ where: { id }, relations: ['user', 'images'] });
    if (!listing) throw new NotFoundException(`Listing with ID ${id} not found`);
    return listing;
  }
  async searchListings(searchDto: SearchListingDto) {
    const { q, price, location, category, available, isApproved } = searchDto;

    const query = this.listingsRepository
      .createQueryBuilder('listing')
      .leftJoinAndSelect('listing.user', 'user') // Lấy thông tin User
      .leftJoinAndSelect('listing.images', 'images'); // Lấy danh sách Images

    // Tìm kiếm theo tiêu đề hoặc mô tả
    if (q) {
      query.andWhere('listing.title LIKE :q OR listing.description LIKE :q', {
        q: `%${q}%`,
      });
    }

    // Lọc theo khoảng giá
    if (price) {
      const [minPrice, maxPrice] = price.split('-').map(Number);
      if (!isNaN(minPrice) && !isNaN(maxPrice)) {
        query.andWhere('listing.price BETWEEN :minPrice AND :maxPrice', {
          minPrice,
          maxPrice,
        });
      }
    }

    // Lọc theo địa điểm
    if (location) {
      query.andWhere('listing.location = :location', { location });
    }

    // Lọc theo danh mục
    if (category) {
      query.andWhere('listing.category = :category', { category });
    }

    // Lọc theo trạng thái có sẵn
    if (available !== undefined) {
      query.andWhere('listing.available = :available', { available });
    }

    // Lọc theo trạng thái đã duyệt
    if (isApproved !== undefined) {
      query.andWhere('listing.isApproved = :isApproved', { isApproved });
    }

    return query.getMany();
  }
  // async update(id: number, updateListingDto: UpdateListingDto): Promise<Listing> {
  //   await this.listingsRepository.update(id, updateListingDto);
  //   return this.findOne(id);
  // }

  async remove(id: number): Promise<void> {
    const result = await this.listingsRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Listing with ID ${id} not found`);
  }
}
