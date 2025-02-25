import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListingsService } from './listings.service';
import { ListingsController } from './listings.controller';
import { Listing } from './entities/listing.entity';
import { UsersModule } from '../users/users.module';
import { CategoriesModule } from '../categories/categories.module';
import { LocationsModule } from '../locations/locations.module';
import { User } from '../users/entities/user.entity';
import { Image } from '../images/entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Listing, User, Image]), UsersModule,
    LocationsModule,
    CategoriesModule],
  controllers: [ListingsController],
  providers: [ListingsService],
  exports: [TypeOrmModule.forFeature([Listing])],
})
export class ListingsModule { }
