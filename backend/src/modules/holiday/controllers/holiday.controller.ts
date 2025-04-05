import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { HolidayService } from '../services/holiday.service';
import { Holiday } from '../schemas/holiday.schema';
import { CreateHolidayDTO, UpdateHolidayDTO } from '../dtos/holiday.dto';
@Controller('api/holidays')
export class HolidayController {
  constructor(private readonly holidayService: HolidayService) { }

  @Post()
  async create(@Body() createHolidayDto: CreateHolidayDTO): Promise<Holiday> {
    return this.holidayService.create(createHolidayDto);
  }

  @Get()
  async findAll(@Query() query: any): Promise<Holiday[]> {
    return this.holidayService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Holiday> {
    return this.holidayService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateHolidayDto: UpdateHolidayDTO,
  ): Promise<Holiday> {
    return this.holidayService.update(id, updateHolidayDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Holiday> {
    return this.holidayService.remove(id);
  }

  @Get('store/:storeId')
  async findByStore(@Param('storeId') storeId: string): Promise<Holiday[]> {
    return this.holidayService.findByStore(storeId);
  }

  @Get('date/:date')
  async findByDate(@Param('date') date: string): Promise<Holiday[]> {
    return this.holidayService.findByDate(date);
  }

  @Get('month/:year/:month')
  async findByMonth(
    @Param('year') year: number,
    @Param('month') month: number,
  ): Promise<Holiday[]> {
    return this.holidayService.findByMonth(year, month);
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ): Promise<Holiday> {
    return this.holidayService.updateStatus(id, status);
  }
}
