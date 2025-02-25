import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Listing } from '../listings/entities/listing.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
    @InjectRepository(Listing)
    private listingsRepository: Repository<Listing>,
  ) { }

  async create(createImageDto: CreateImageDto): Promise<Image> {
    const listing = await this.listingsRepository.findOne({ where: { id: createImageDto.listingId } });
    if (!listing) throw new NotFoundException(`Listing with ID ${createImageDto.listingId} not found`);

    const newImage = this.imagesRepository.create({ url: createImageDto.url, listing });
    return this.imagesRepository.save(newImage);
  }

  async findAll(): Promise<Image[]> {
    return this.imagesRepository.find({ relations: ['listing'] });
  }

  async findOne(id: number): Promise<Image> {
    const image = await this.imagesRepository.findOne({ where: { id }, relations: ['listing'] });
    if (!image) throw new NotFoundException(`Image with ID ${id} not found`);
    return image;
  }

  async update(id: number, updateImageDto: UpdateImageDto): Promise<Image> {
    await this.imagesRepository.update(id, updateImageDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.imagesRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Image with ID ${id} not found`);
  }
}
