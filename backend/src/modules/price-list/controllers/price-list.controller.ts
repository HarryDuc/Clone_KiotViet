import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { PriceListService } from '../services/price-list.service';
import { CreatePriceListDTO, UpdatePriceListDTO } from '../dtos/price-list.dto';
import { PriceList } from '../schemas/price-list.schema';

@Controller('price-lists')
export class PriceListController {
  constructor(private readonly priceListService: PriceListService) { }

  @Post()
  async create(@Body() createPriceListDto: CreatePriceListDTO): Promise<PriceList> {
    return this.priceListService.create(createPriceListDto);
  }

  @Get()
  async findAll(
    @Query('branchId') branchId?: string,
    @Query('status') status?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<PriceList[]> {
    // TODO: Implement filtering logic in service
    return this.priceListService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PriceList> {
    return this.priceListService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePriceListDto: UpdatePriceListDTO,
  ): Promise<PriceList> {
    return this.priceListService.update(id, updatePriceListDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<PriceList> {
    return this.priceListService.remove(id);
  }

  @Put(':id/activate')
  async activate(@Param('id') id: string): Promise<PriceList> {
    const updateDto = { status: 'active' };
    return this.priceListService.update(id, updateDto);
  }

  @Put(':id/deactivate')
  async deactivate(@Param('id') id: string): Promise<PriceList> {
    const updateDto = { status: 'inactive' };
    return this.priceListService.update(id, updateDto);
  }
}