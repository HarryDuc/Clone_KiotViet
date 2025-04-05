import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Destruction } from 'src/modules/destruction/schemas/destructions.schema';
import { CreateDestructionDTO, UpdateDestructionDTO } from 'src/modules/destruction/dtos/destruction.dto';
import { DestructionService } from '../services/destruction.service';

@Controller('api/destructions')
export class DestructionController {
  constructor(private readonly destructionService: DestructionService) { }

  @Post()
  async create(@Body() createDestructionDto: CreateDestructionDTO): Promise<Destruction> {
    return this.destructionService.create(createDestructionDto);
  }

  @Get()
  findAll() {
    return this.destructionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.destructionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDestructionDto: UpdateDestructionDTO) {
    return this.destructionService.update(id, updateDestructionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.destructionService.remove(id);
  }
}