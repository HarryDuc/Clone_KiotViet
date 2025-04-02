import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Department, DepartmentSchema } from '../supplier/schemas/department.schema';
import { DepartmentController } from '../controllers/department.controller';
import { DepartmentService } from '../supplier/services/department.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Departments', schema: DepartmentSchema }])
  ],
  controllers: [DepartmentController],
  providers: [DepartmentService],
  exports: [DepartmentService]
})
export class DepartmentModule { }
