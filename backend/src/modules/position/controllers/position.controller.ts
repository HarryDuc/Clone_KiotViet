import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Position } from '../position/schemas/position.schema';
import { PositionService } from '../position/services/position.service';

@Controller('api/positions')
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
  update(@Param('id') id: string, @Body() updatePositionDto: any) {
    return this.positionService.update(id, updatePositionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.positionService.remove(id);
  }
}