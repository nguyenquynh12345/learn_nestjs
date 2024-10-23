import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './module/users/users.module';
import { ListCategoryModule } from './module/list-category/list-category.module';
import { createTypeMysqlOrmOptions } from './config/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(), // Đảm bảo ConfigModule được import
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => createTypeMysqlOrmOptions(),
      inject: [ConfigService],
    }),
    UserModule,
    ListCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
