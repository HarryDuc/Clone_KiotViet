import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommissionSettingService } from '../services/commission-setting.service';
import { CommissionSetting } from '../schemas/commission-setting.schema';
import { CreateCommissionSettingDTO } from '../dtos/commisson-setting.dto';

@Controller('api/commission-settings')
export class CommissionSettingController {
  constructor(private readonly commissionSettingService: CommissionSettingService) { }

  @Post()
  async create(@Body() createCommissionSettingDto: CreateCommissionSettingDTO): Promise<CommissionSetting> {
    return this.commissionSettingService.create(createCommissionSettingDto);
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
  update(@Param('id') id: string, @Body() createCommissionSettingDto: CreateCommissionSettingDTO) {
    return this.commissionSettingService.update(id, createCommissionSettingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commissionSettingService.remove(id);
  }
}