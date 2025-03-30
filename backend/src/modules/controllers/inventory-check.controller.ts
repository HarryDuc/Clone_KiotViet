import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { InventoryCheckService } from '../services/inventory-check.service';
import { InventoryCheck } from '../schemas/inventory-check.schema';

@Controller('inventory-checks')
export class InventoryCheckController {
  constructor(private readonly inventoryCheckService: InventoryCheckService) { }

  @Post()
  async create(@Body() createInventoryCheckDto: any): Promise<InventoryCheck> {
    return this.inventoryCheckService.create(createInventoryCheckDto);
  }

  @Get()
  async findAll(): Promise<InventoryCheck[]> {
    return this.inventoryCheckService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<InventoryCheck> {
    return this.inventoryCheckService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInventoryCheckDto: any,
  ): Promise<InventoryCheck> {
    return this.inventoryCheckService.update(id, updateInventoryCheckDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<InventoryCheck> {
    return this.inventoryCheckService.remove(id);
  }

  @Put(':id/approve')
  async approve(@Param('id') id: string): Promise<InventoryCheck> {
    const updateDto = { status: 'approved' };
    return this.inventoryCheckService.update(id, updateDto);
  }

  @Put(':id/reject')
  async reject(@Param('id') id: string): Promise<InventoryCheck> {
    const updateDto = { status: 'rejected' };
    return this.inventoryCheckService.update(id, updateDto);
  }
}