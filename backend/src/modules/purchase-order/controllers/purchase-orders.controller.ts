import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PurchaseOrderService } from '../services/purchase-orders.service';
import { PurchaseOrder } from '../schemas/purchase-orders.schema';
import { CreatePurchaseOrderDTO, UpdatePurchaseOrderDTO } from '../dtos/purchase-order.dto';
@Controller('api/purchase-orders')
export class PurchaseOrderController {
  constructor(private readonly purchaseOrderService: PurchaseOrderService) { }

  @Post()
  async create(@Body() createPurchaseOrderDto: CreatePurchaseOrderDTO): Promise<PurchaseOrder> {
    return this.purchaseOrderService.create(createPurchaseOrderDto);
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
  update(@Param('id') id: string, @Body() updatepurchaseOrderDto: UpdatePurchaseOrderDTO) {
    return this.purchaseOrderService.update(id, updatepurchaseOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseOrderService.remove(id);
  }
}