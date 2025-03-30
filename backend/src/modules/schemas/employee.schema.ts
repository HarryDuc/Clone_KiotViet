import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema()
class SalaryDetails {
  @Prop()
  shiftRate: number;

  @Prop()
  hourlyRate: number;

  @Prop()
  dailyRate: number;

  @Prop()
  fixedRate: number;
}

@Schema()
class Bonus {
  @Prop({ enum: ['Doanh thu cá nhân', 'Lợi nhuận chi nhánh', 'Lợi nhuận gộp'] })
  type: string;

  @Prop({ enum: ['Tổng doanh thu', 'Bậc thang doanh thu', 'Vượt doanh thu'] })
  form: string;

  @Prop()
  value: number;
}

@Schema()
class Allowance {
  @Prop()
  name: string;

  @Prop({ enum: ['Theo ngày', 'Hàng tháng cố định', 'Hàng tháng tính trên ngày công'] })
  type: string;

  @Prop()
  value: number;

  @Prop({ enum: ['VND', '%'] })
  valueType: string;
}

@Schema()
class Deduction {
  @Prop()
  name: string;

  @Prop({ enum: ['Đi muộn', 'Về sớm', 'Cố định'] })
  type: string;

  @Prop({ enum: ['Theo số lần', 'Theo phút'] })
  condition: string;

  @Prop()
  value: number;
}

@Schema()
export class Employee {
  @Prop({ unique: true })
  employeeId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  address: string;

  @Prop({ type: Types.ObjectId, ref: 'Branch' })
  branchSalary: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Branch' })
  branchWork: Types.ObjectId;

  @Prop()
  startDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'Position' })
  position: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Department' })
  department: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userAccount: Types.ObjectId;

  @Prop()
  idCard: string;

  @Prop()
  dob: Date;

  @Prop({ enum: ['Nam', 'Nữ', 'Khác'] })
  gender: string;

  @Prop({ enum: ['Theo ca', 'Theo giờ', 'Theo ngày công', 'Cố định'] })
  salaryType: string;

  @Prop({ type: SalaryDetails })
  salaryDetails: SalaryDetails;

  @Prop({ type: [Bonus] })
  bonus: Bonus[];

  @Prop()
  commission: number;

  @Prop({ type: Types.ObjectId, ref: 'CommissionSetting' })
  commissionTable: Types.ObjectId;

  @Prop({ type: [Allowance] })
  allowance: Allowance[];

  @Prop({ type: [Deduction] })
  deduction: Deduction[];

  @Prop({ enum: ['Đang làm việc', 'Đã nghỉ'], default: 'Đang làm việc' })
  status: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);