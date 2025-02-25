import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) { }

  @Post()
  create(@Body() createListingDto: CreateListingDto) {
    return this.listingsService.createListing(createListingDto);
  }
  @Post(':id/approve')
  async approveListing(@Param('id') id: number) {
    return this.listingsService.approveListing(id);
  }
  @Get()
  findAll() {
    return this.listingsService.findAll();
  }

  @Get('unapproved')
  getListUnapproved() {
    return this.listingsService.getListUnapproved();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listingsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateListingDto: UpdateListingDto) {
  //   return this.listingsService.update(+id, updateListingDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listingsService.remove(+id);
  }

}
