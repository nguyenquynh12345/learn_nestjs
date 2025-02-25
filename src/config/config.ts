import 'reflect-metadata';
import 'dotenv/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Listing } from 'src/module/listings/entities/listing.entity';
import { User } from 'src/module/users/entities/user.entity';
import { Booking } from 'src/module/bookings/entities/booking.entity';
import { Favorite } from 'src/module/favorites/entities/favorite.entity';
import { Review } from 'src/module/reviews/entities/review.entity';
import { Category } from 'src/module/categories/entities/category.entity';
import { Image } from 'src/module/images/entities/image.entity';
import { Location } from 'src/module/locations/entities/location.entity';


export function createTypeMysqlOrmOptions(): TypeOrmModuleOptions {
  return {
    type: 'mysql',
    host: process.env.DATABASE_MYSQL_HOST,
    port: parseInt(process.env.DATABASE_MYSQL_PORT),
    username: process.env.DATABASE_MYSQL_USERNAME,
    password: process.env.DATABASE_MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    entities: [User, Listing, Booking, Favorite, Review, Category, Image, Location],
    synchronize: false,
    migrationsRun: true,
  };
}
