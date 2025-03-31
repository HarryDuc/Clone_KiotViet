import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarrierService } from '../services/carrier.service';


@Controller('carriers')
export class CarrierController {
  constructor(private readonly carrierService: CarrierService) { }
  @Post()
  create(@Body() createBrandDto: any) {
    return this.carrierService.create(createBrandDto);
  }
}