import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReturnService } from '../services/return.service';
import { Return } from '../schemas/return.schema';
import { CreateReturnDTO, UpdateReturnDTO } from '../dtos/return.dto';
@Controller('api/returns')
export class ReturnController {
  constructor(private readonly returnService: ReturnService) { }

  @Post()
  async create(@Body() createReturnDto: CreateReturnDTO): Promise<Return> {
    return this.returnService.create(createReturnDto);
  }

  @Get()
  findAll() {
    return this.returnService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.returnService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReturnDto: UpdateReturnDTO) {
    return this.returnService.update(id, updateReturnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.returnService.remove(id);
  }
}