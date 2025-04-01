import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarrierService } from '../services/carrier.service';

@Controller('api/carriers')
export class CarrierController {
  constructor(private readonly carrierService: CarrierService) { }
  @Post()
  create(@Body() createBrandDto: any) {
    return this.carrierService.create(createBrandDto);
  }
  @Get()
  findAll() {
    return this.carrierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carrierService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: any) {
    return this.carrierService.update(id, updateBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carrierService.remove(id);
  }
}