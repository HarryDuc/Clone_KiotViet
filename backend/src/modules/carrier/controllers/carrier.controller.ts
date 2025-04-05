import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarrierService } from '../services/carrier.service';
import { CreateCarrierDTO, UpdateCarrierDTO } from '../dtos/carrier.dto';

@Controller('api/carriers')
export class CarrierController {
  constructor(private readonly carrierService: CarrierService) { }
  @Post()
  create(@Body() createCarrierDto: CreateCarrierDTO) {
    return this.carrierService.create(createCarrierDto);
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
  update(@Param('id') id: string, @Body() updateCarrierDto: UpdateCarrierDTO) {
    return this.carrierService.update(id, updateCarrierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carrierService.remove(id);
  }
}