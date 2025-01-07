import 'reflect-metadata';
import 'dotenv/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/module/users/entities/user.entity';
import { Room } from 'src/module/room/entities/room.entity';
import { CategoryRoom } from 'src/module/category-room/entities/category-room.entity';

export function createTypeMysqlOrmOptions(): TypeOrmModuleOptions {
  return {
    type: 'mysql',
    host: process.env.DATABASE_MYSQL_HOST,
    port: parseInt(process.env.DATABASE_MYSQL_PORT),
    username: process.env.DATABASE_MYSQL_USERNAME,
    password: process.env.DATABASE_MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    entities: [User, Room, CategoryRoom],
    synchronize: false,
    migrationsRun: true,
  };
}
