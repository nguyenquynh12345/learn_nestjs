import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) { }
  @Get('rooms')
  @Get()
  async search(
    @Query('q') query: string,
    @Query('price') price: string,
    @Query('region') region: number,
    @Query('categories') categories: string,
  ) {
    return this.searchService.searchRooms(query, price, region, categories);
  }

}
