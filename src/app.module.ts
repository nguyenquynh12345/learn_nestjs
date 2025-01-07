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

@Module({
  imports: [
    ConfigModule.forRoot(), // Đảm bảo ConfigModule được import
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        createTypeMysqlOrmOptions(),
      inject: [ConfigService],
    }),
    UserModule,
    LoginModule,
    RoomModule,
    CategoryRoomModule,
    JwtModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
