import { Controller, Get, Post, Body, Param, BadRequestException } from '@nestjs/common';
import { BrandService } from '../services/brand.service';
import { Brand } from '../schemas/brand.schema';

@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) { }

  @Post()
  async create(@Body() createBrandDto: { name: string; location: string }): Promise<Brand> {
    if (!createBrandDto.name || !createBrandDto.location) {
      throw new BadRequestException('Name and location are required');
    }
    return this.brandService.create(createBrandDto);
  }

  @Get()
  async findAll(): Promise<Brand[]> {
    return this.brandService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Brand> {
    return this.brandService.findOne(id);
  }
}