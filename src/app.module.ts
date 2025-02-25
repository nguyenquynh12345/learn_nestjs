import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createTypeMysqlOrmOptions } from './config/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './module/upload/upload.module';
import { MulterModule } from '@nestjs/platform-express';
import { CategoriesModule } from './module/categories/categories.module';
import { LocationsModule } from './module/locations/locations.module';
import { ListingsModule } from './module/listings/listings.module';
import { ImagesModule } from './module/images/images.module';
import { ReviewsModule } from './module/reviews/reviews.module';
import { FavoritesModule } from './module/favorites/favorites.module';
import { BookingsModule } from './module/bookings/bookings.module';
import { UsersModule } from './module/users/users.module';
import { AuthModule } from './module/auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        createTypeMysqlOrmOptions(),
      inject: [ConfigService],
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    UsersModule,
    CategoriesModule,
    LocationsModule,
    ListingsModule,
    ImagesModule,
    ReviewsModule,
    FavoritesModule,
    BookingsModule,
    AuthModule,
    UploadModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
