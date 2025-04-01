import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarrierGroupService } from '../services/carrier-group.service';
import { CarrierGroup } from '../schemas/carrier-group.schema';

@Controller('carriers-group')
export class CarrierGroupController {
  constructor(private readonly carriersService: CarrierGroupService) { }

  @Post()
  async create(@Body() createCarrierGroupDto: any): Promise<CarrierGroup> {
    return this.carriersService.create(createCarrierGroupDto);
  }

  @Get()
  findAll() {
    return this.carriersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carriersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarrierGroupDto: any) {
    return this.carriersService.update(id, updateCarrierGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carriersService.remove(id);
  }
}