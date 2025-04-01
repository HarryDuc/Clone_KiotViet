import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Payroll } from '../schemas/payroll.schema';
import { PayrollService } from '../services/payroll.service';

@Controller('api/payrolls')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) { }

  @Post()
  async create(@Body() createPayrollDto: any): Promise<Payroll> {
    return this.payrollService.create(createPayrollDto);
  }

  @Get()
  findAll() {
    return this.payrollService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payrollService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatepayrollDto: any) {
    return this.payrollService.update(id, updatepayrollDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payrollService.remove(id);
  }
}