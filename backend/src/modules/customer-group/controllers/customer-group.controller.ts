import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerGroupService } from '../services/customer-group.service';
import { CreateCustomerGroupDTO, UpdateCustomerGroupDTO } from '../dtos/customer-group.dto';

@Controller('api/customer-groups')
export class CustomerGroupController {
  constructor(private readonly customerGroupService: CustomerGroupService) { }

  @Post()
  create(@Body() createCustomerGroupDto: CreateCustomerGroupDTO) {
    return this.customerGroupService.create(createCustomerGroupDto);
  }

  @Get()
  findAll() {
    return this.customerGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerGroupService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerGroupDto: UpdateCustomerGroupDTO) {
    return this.customerGroupService.update(id, updateCustomerGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerGroupService.remove(id);
  }
}
