import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerLoyaltyPointsService } from '../services/customer-loyalty-points.service';
import { CustomerLoyaltyPoints } from '../schemas/customer-loyalty-points.schema';

@Controller('api/customer-loyalty-points')
export class CustomerLoyaltyPointsController {
  constructor(private readonly customerLoyaltyPointsService: CustomerLoyaltyPointsService) { }

  @Post()
  create(@Body() customerLoyaltyPointsService: any) {
    return this.customerLoyaltyPointsService.create(customerLoyaltyPointsService);
  }

  @Get()
  findAll() {
    return this.customerLoyaltyPointsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerLoyaltyPointsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerLoyaltyPointsDto: any) {
    return this.customerLoyaltyPointsService.update(id, updateCustomerLoyaltyPointsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerLoyaltyPointsService.remove(id);
  }
}
