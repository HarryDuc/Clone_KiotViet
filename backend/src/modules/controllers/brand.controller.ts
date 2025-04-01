import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BrandService } from '../services/brand.service';
import { Brand } from '../schemas/brand.schema';

@Controller('api/brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) { }

  @Post()
  async create(@Body() createBranchDto: any): Promise<Brand> {
    return this.brandService.create(createBranchDto);
  }

  @Get()
  findAll() {
    return this.brandService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: any) {
    return this.brandService.update(id, updateBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(id);
  }
}