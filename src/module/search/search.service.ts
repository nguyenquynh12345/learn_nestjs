import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { UsersService } from '../users/users.service';
import { Listing } from '../listings/entities/listing.entity';


@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Listing)
    private readonly roomRepository: Repository<Listing>,

    private readonly usersService: UsersService, // Inject user service
  ) { }

  async searchRooms(query: string, price: string, region: number, categories: string): Promise<any[]> {
    console.log(query, price, region, categories);

    const whereCondition: any = {};
    if (query) whereCondition.roomName = ILike(`%${query}%`);

    if (price) {
      switch (price) {
        case 'price1':
          whereCondition.price = LessThanOrEqual(1000000); // Giá ≤ 100
          break;
        case 'price2':
          whereCondition.price = Between(1000000, 2000000); // 101 ≤ Giá ≤ 500
          break;
        case 'price3':
          whereCondition.price = Between(2000000, 5000000); // 101 ≤ Giá ≤ 500
          break;
        case 'price4':
          whereCondition.price = Between(5000000, 10000000); // 101 ≤ Giá ≤ 500
          break;
        case 'price5':
          whereCondition.price = MoreThanOrEqual(10000000); // Giá ≥ 501
          break;
      }
    }

    if (region) whereCondition.region = region;
    if (categories) whereCondition.categories = categories;

    // Truy vấn danh sách phòng
    const data = await this.roomRepository.find({ where: whereCondition });

    // Lấy thông tin user bằng Promise.all để tối ưu
    const newData = await Promise.all(
      data.map(async (room) => {
        const user = await this.usersService.findOne(1);
        return { ...room, user };
      }),
    );

    return newData;
  }
}
