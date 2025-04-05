import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SaleChannelService } from '../services/sale-channel.service';
import { CreateSalesChannelDTO, UpdateSalesChannelDTO } from '../dtos/sale-channel.dto';
import { SaleChannel } from '../schemas/sale-channel.schema';
@Controller('api/sale-channels')
export class SaleChannelController {
  constructor(private readonly saleChannelService: SaleChannelService) { }

  @Post()
  async create(@Body() createSalesChannelDto: CreateSalesChannelDTO): Promise<SaleChannel> {
    return this.saleChannelService.create(createSalesChannelDto);
  }

  @Get()
  findAll() {
    return this.saleChannelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleChannelService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSalesChannelDto: UpdateSalesChannelDTO) {
    return this.saleChannelService.update(id, updateSalesChannelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleChannelService.remove(id);
  }
}