import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommissionSettingService } from '../services/commission-setting.service';
import { CommissionSetting } from '../schemas/commission-setting.schema';

@Controller('api/commission-settings')
export class CommissionSettingController {
  constructor(private readonly commissionSettingService: CommissionSettingService) { }

  @Post()
  async create(@Body() createCashBookDto: any): Promise<CommissionSetting> {
    return this.commissionSettingService.create(createCashBookDto);
  }

  @Get()
  findAll() {
    return this.commissionSettingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commissionSettingService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: any) {
    return this.commissionSettingService.update(id, updateBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commissionSettingService.remove(id);
  }
}