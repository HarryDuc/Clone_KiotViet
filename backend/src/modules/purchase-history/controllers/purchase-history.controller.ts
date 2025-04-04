import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PurchaseHistoryService } from '../services/purchase-history.service';
import { PurchaseHistory } from '../schemas/purchase-history.schema';
import { CreatePurchaseHistoryDTO, UpdatePurchaseHistoryDTO } from '../dtos/purchase-history.dto';
@Controller('api/purchase-historys')
export class PurchaseHistoryController {
  constructor(private readonly PurchaseHistoryService: PurchaseHistoryService) { }

  @Post()
  async create(@Body() createPurchaseHistoryDto: CreatePurchaseHistoryDTO): Promise<PurchaseHistory> {
    return this.PurchaseHistoryService.create(createPurchaseHistoryDto);
  }

  @Get()
  findAll() {
    return this.PurchaseHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.PurchaseHistoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePurchaseHistoryDto: UpdatePurchaseHistoryDTO) {
    return this.PurchaseHistoryService.update(id, updatePurchaseHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.PurchaseHistoryService.remove(id);
  }
}