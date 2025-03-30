import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { CashBookService } from '../services/cash-book.service';
import { CashBook } from '../schemas/cash-book.schema';

@Controller('cash-books')
export class CashBookController {
  constructor(private readonly cashBookService: CashBookService) { }

  @Post()
  async create(@Body() createCashBookDto: any): Promise<CashBook> {
    return this.cashBookService.create(createCashBookDto);
  }

  @Get()
  async findAll(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('type') type?: string,
    @Query('branchId') branchId?: string,
  ): Promise<CashBook[]> {
    // TODO: Implement filtering logic in service
    return this.cashBookService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CashBook> {
    return this.cashBookService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCashBookDto: any,
  ): Promise<CashBook> {
    return this.cashBookService.update(id, updateCashBookDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<CashBook> {
    return this.cashBookService.remove(id);
  }

  @Put(':id/approve')
  async approve(@Param('id') id: string): Promise<CashBook> {
    const updateDto = { status: 'approved' };
    return this.cashBookService.update(id, updateDto);
  }

  @Put(':id/reject')
  async reject(@Param('id') id: string): Promise<CashBook> {
    const updateDto = { status: 'rejected' };
    return this.cashBookService.update(id, updateDto);
  }
}