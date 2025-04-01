import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'Bonuses' })
export class Bonus {
  @Prop({ enum: ['Doanh thu cá nhân', 'Lợi nhuận chi nhánh', 'Lợi nhuận gộp'] })
  type: string;

  @Prop({ enum: ['Tổng doanh thu', 'Bậc thang doanh thu', 'Vượt doanh thu'] })
  form: string;

  @Prop()
  value: number;
}

export const BonusSchema = SchemaFactory.createForClass(Bonus);

@Schema({ collection: 'Allowances' })
export class Allowance {
  @Prop()
  name: string;

  @Prop({ enum: ['Theo ngày', 'Hàng tháng cố định', 'Hàng tháng tính trên ngày công'] })
  type: string;

  @Prop()
  value: number;

  @Prop({ enum: ['VND', '%'] })
  valueType: string;
}

export const AllowanceSchema = SchemaFactory.createForClass(Allowance);

@Schema({ collection: 'Deductions' })
export class Deduction {
  @Prop()
  name: string;

  @Prop({ enum: ['Đi muộn', 'Về sớm', 'Cố định'] })
  type: string;

  @Prop({ enum: ['Theo số lần', 'Theo phút'] })
  condition: string;

  @Prop()
  value: number;
}

export const DeductionSchema = SchemaFactory.createForClass(Deduction);

@Schema({ timestamps: true, collection: 'Employees' })
export class Employee extends Document {
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

  @Prop({ type: Types.ObjectId, ref: 'Branches' })
  branchSalary: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Branches' })
  branchWork: Types.ObjectId;

  @Prop()
  startDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'Positions' })
  position: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Departments' })
  department: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Users' })
  userAccount: Types.ObjectId;

  @Prop()
  idCard: string;

  @Prop()
  dob: Date;

  @Prop({ enum: ['Nam', 'Nữ', 'Khác'] })
  gender: string;

  @Prop({ enum: ['Theo ca', 'Theo giờ', 'Theo ngày công', 'Cố định'] })
  salaryType: string;

  @Prop({
    type: {
      shiftRate: Number,
      hourlyRate: Number,
      dailyRate: Number,
      fixedRate: Number,
    },
  })
  salaryDetails: {
    shiftRate: number;
    hourlyRate: number;
    dailyRate: number;
    fixedRate: number;
  };

  @Prop({ type: [BonusSchema] })
  bonus: Bonus[];

  @Prop()
  commission: number;

  @Prop({ type: Types.ObjectId, ref: 'CommissionSettings' })
  commissionTable: Types.ObjectId;

  @Prop({ type: [AllowanceSchema] })
  allowance: Allowance[];

  @Prop({ type: [DeductionSchema] })
  deduction: Deduction[];

  @Prop({ enum: ['Đang làm việc', 'Đã nghỉ'], default: 'Đang làm việc' })
  status: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);