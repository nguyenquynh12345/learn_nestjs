import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) { }

  async create(name: string, parent_id?: number): Promise<Location> {
    const location = this.locationRepository.create({ name, parent_id });
    return this.locationRepository.save(location);
  }

  async findAll(): Promise<Location[]> {
    return this.locationRepository.find();
  }

  async findOne(id: number): Promise<Location> {
    return this.locationRepository.findOne({ where: { id } });
  }

  async update(id: number, name: string, parent_id?: number): Promise<Location> {
    await this.locationRepository.update(id, { name, parent_id });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.locationRepository.delete(id);
  }
}
