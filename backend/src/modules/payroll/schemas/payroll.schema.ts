import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'Payrolls' })
export class Payroll extends Document {
  @Prop({ unique: true, required: true })
  payrollId: string;

  @Prop({ type: Types.ObjectId, ref: 'Employees' })
  employeeId: Types.ObjectId;

  @Prop()
  month: number;

  @Prop()
  year: number;

  @Prop()
  basicSalary: number;

  @Prop({ default: 0 })
  bonus: number;

  @Prop({ default: 0 })
  commission: number;

  @Prop({ default: 0 })
  allowance: number;

  @Prop({ default: 0 })
  deduction: number;

  @Prop()
  total: number;

  @Prop({ default: 0 })
  paid: number;

  @Prop({ enum: ['Đang tạo', 'Tạm tính', 'Đã chốt lương', 'Đã hủy'], default: 'Đang tạo' })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'Branches' })
  branch: Types.ObjectId;
}

export const PayrollSchema = SchemaFactory.createForClass(Payroll);