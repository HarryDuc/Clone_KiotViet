import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BrandService } from '../services/brand.service';
import { Brand } from '../schemas/brand.schema';
import { Position } from '../schemas/position.schema';
import { PositionService } from '../services/position.service';

@Controller('positions')
export class PositionController {
  constructor(private readonly positionService: PositionService) { }

  @Post()
  async create(@Body() createPositionDto: any): Promise<Position> {
    return this.positionService.create(createPositionDto);
  }

  @Get()
  findAll() {
    return this.positionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.positionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatepositionDto: any) {
    return this.positionService.update(id, updatepositionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.positionService.remove(id);
  }
}