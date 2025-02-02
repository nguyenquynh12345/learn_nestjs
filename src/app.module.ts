import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createTypeMysqlOrmOptions } from './config/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/users/users.module';
import { LoginModule } from './module/login/login.module';
import { RoomModule } from './module/room/room.module';
import { CategoryRoomModule } from './module/category-room/category-room.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './module/login/jwt-auth.guard';
import { UploadModule } from './module/upload/upload.module';
import { MulterModule } from '@nestjs/platform-express';
import { SearchModule } from './module/search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Đảm bảo ConfigModule được import
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        createTypeMysqlOrmOptions(),
      inject: [ConfigService],
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    UploadModule,
    UserModule,
    LoginModule,
    RoomModule,
    CategoryRoomModule,
    JwtModule,
    UploadModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
