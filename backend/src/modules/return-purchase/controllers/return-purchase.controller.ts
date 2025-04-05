import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReturnPurchaseService } from '../services/return-purchase.service';
import { ReturnPurchase } from '../schemas/return-purchase.schema';
import { CreateReturnPurchaseDTO, UpdateReturnPurchaseDTO } from '../dtos/return-purchase.dto';
@Controller('api/return-purchases')
export class ReturnPurchaseController {
  constructor(private readonly returnPurchaseService: ReturnPurchaseService) { }

  @Post()
  async create(@Body() createReturnPurchaseDto: CreateReturnPurchaseDTO): Promise<ReturnPurchase> {
    return this.returnPurchaseService.create(createReturnPurchaseDto);
  }

  @Get()
  findAll() {
    return this.returnPurchaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.returnPurchaseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReturnPurchaseDto: UpdateReturnPurchaseDTO) {
    return this.returnPurchaseService.update(id, updateReturnPurchaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.returnPurchaseService.remove(id);
  }
}