import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarrierGroupService } from '../services/carrier-group.service';
import { CarrierGroup } from '../schemas/carrier-group.schema';
import { CreateCarrierGroupDTO, UpdateCarrierGroupDTO } from '../dtos/carrier-group.dto';

@Controller('api/carriers-groups')
export class CarrierGroupController {
  constructor(private readonly carriersService: CarrierGroupService) { }

  @Post()
  async create(@Body() createCarrierGroupDto: CreateCarrierGroupDTO): Promise<CarrierGroup> {
    return this.carriersService.create(createCarrierGroupDto);
  }

  @Get()
  findAll() {
    return this.carriersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carriersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarrierGroupDto: UpdateCarrierGroupDTO) {
    return this.carriersService.update(id, updateCarrierGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carriersService.remove(id);
  }
}