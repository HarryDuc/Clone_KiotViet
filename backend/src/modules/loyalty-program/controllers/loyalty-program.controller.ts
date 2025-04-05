import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoyaltyProgramService } from '../services/loyalty-program.service';
import { CreateLoyaltyProgramDTO, UpdateLoyaltyProgramDTO } from '../dtos/loyalty-program.dto';
@Controller('api/loyalty-programs')
export class LoyaltyProgramController {
  constructor(private readonly loyaltyProgramService: LoyaltyProgramService) { }

  @Post()
  create(@Body() createLoyaltyProgramDto: CreateLoyaltyProgramDTO) {
    return this.loyaltyProgramService.create(createLoyaltyProgramDto);
  }

  @Get()
  findAll() {
    return this.loyaltyProgramService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loyaltyProgramService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoyaltyProgramDto: UpdateLoyaltyProgramDTO) {
    return this.loyaltyProgramService.update(id, updateLoyaltyProgramDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loyaltyProgramService.remove(id);
  }
}