import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupplierGroupService } from '../services/supplier-group.service';
import { SupplierGroup } from '../schemas/supplier-group.schema';

@Controller('api/supplier-groups')
export class SupplierGroupController {
  constructor(private readonly supplierGroupService: SupplierGroupService) { }

  @Post()
  async create(@Body() createBranchDto: any): Promise<SupplierGroup> {
    return this.supplierGroupService.create(createBranchDto);
  }

  @Get()
  findAll() {
    return this.supplierGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplierGroupService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupplierGroupDto: any) {
    return this.supplierGroupService.update(id, updateSupplierGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplierGroupService.remove(id);
  }
}