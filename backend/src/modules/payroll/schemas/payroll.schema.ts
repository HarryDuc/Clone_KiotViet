import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'Payrolls' })
export class Payroll extends Document {
  @Prop({ unique: true, required: true })
  payrollId: string; // Mã bảng lương

  @Prop({ type: Types.ObjectId, ref: 'Employees', required: true })
  employeeId: Types.ObjectId; // Mã nhân viên

  @Prop({ required: true })
  month: number; // Tháng

  @Prop({ required: true })
  year: number; // Năm

  @Prop({ required: true })
  basicSalary: number; // Lương cơ bản

  @Prop({ default: 0 })
  bonus: number; // Thưởng

  @Prop({ default: 0 })
  commission: number; // Hoa hồng

  @Prop({ default: 0 })
  allowance: number; // Phụ cấp

  @Prop({ default: 0 })
  deduction: number; // Khấu trừ

  @Prop({ required: true })
  total: number; // Tổng lương

  @Prop({ default: 0 })
  paid: number; // Đã trả

  @Prop({ enum: ['creating', 'calculated', 'confirmed', 'cancelled'], default: 'creating' })
  status: string; // Trạng thái

  @Prop({ type: Types.ObjectId, ref: 'Branches', required: true })
  branch: Types.ObjectId; // Mã chi nhánh
}

export const PayrollSchema = SchemaFactory.createForClass(Payroll);