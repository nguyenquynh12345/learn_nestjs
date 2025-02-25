import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) { }

  @Post()
  create(@Body('name') name: string, @Body('parent_id') parent_id?: number) {
    return this.locationsService.create(name, parent_id);
  }

  @Get()
  findAll() {
    return this.locationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.locationsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body('name') name: string, @Body('parent_id') parent_id?: number) {
    return this.locationsService.update(id, name, parent_id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.locationsService.remove(id);
  }
}
