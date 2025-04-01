import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Payroll, PayrollSchema } from '../schemas/payroll.schema';
import { PayrollController } from '../controllers/payroll.controller';
import { PayrollService } from '../services/payroll.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payroll.name, schema: PayrollSchema }])
  ],
  controllers: [PayrollController],
  providers: [PayrollService],
  exports: [PayrollService]
})
export class PayrollModule { }
