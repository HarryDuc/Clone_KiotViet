import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServicePackageService } from '../services/service-package.service';
import { ServicePackage } from '../schemas/service-package.schems';

@Controller('api/service-packages')
export class ServicePackageController {
  constructor(private readonly ServicePackageService: ServicePackageService) { }

  @Post()
  async create(@Body() createServicePackageDto: any): Promise<ServicePackage> {
    return this.ServicePackageService.create(createServicePackageDto);
  }

  @Get()
  findAll() {
    return this.ServicePackageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ServicePackageService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServicePackageDto: any) {
    return this.ServicePackageService.update(id, updateServicePackageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ServicePackageService.remove(id);
  }
}