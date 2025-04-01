import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PurchaseOrderService } from '../services/purchase-orders.service';
import { PurchaseOrder } from '../schemas/purchase-orders.schema';

@Controller('purchase-orders')
export class PurchaseOrderController {
  constructor(private readonly purchaseOrderService: PurchaseOrderService) { }

  @Post()
  async create(@Body() createBranchDto: any): Promise<PurchaseOrder> {
    return this.purchaseOrderService.create(createBranchDto);
  }

  @Get()
  findAll() {
    return this.purchaseOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseOrderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatepurchaseOrderDto: any) {
    return this.purchaseOrderService.update(id, updatepurchaseOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseOrderService.remove(id);
  }
}