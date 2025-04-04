import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
@Schema({ collection: 'Employees' })
export class Employee extends Document {
  @Prop({ unique: true, required: true })
  employeeId: string; // Mã nhân viên

  @Prop({ required: true })
  name: string; // Tên nhân viên

  @Prop({ required: true })
  phone: string; // Số điện thoại

  @Prop({ type: Types.ObjectId, ref: 'Stores' })
  storeId: Types.ObjectId; // Chi nhánh làm việc

  @Prop({ type: Types.ObjectId, ref: 'Stores' })
  payrollStoreId: Types.ObjectId; // Chi nhánh trả lương

  @Prop({ type: Types.ObjectId, ref: 'Departments' })
  departmentId: Types.ObjectId; // Mã phòng ban

  @Prop({ type: Types.ObjectId, ref: 'Positions' })
  positionId: Types.ObjectId; // Mã chức danh

  @Prop()
  startDate: Date; // Ngày bắt đầu làm việc

  @Prop({
    type: {
      gender: String,
      dateOfBirth: Date,
      idNumber: String,
    },
  })
  personalInfo: {
    gender: string; // Giới tính
    dateOfBirth: Date; // Ngày sinh
    idNumber: string; // CMND/CCCD
  }; // Thông tin cá nhân

  @Prop({
    type: {
      address: String,
      email: String,
      facebook: String,
    },
  })
  contactInfo: {
    address: string; // Địa chỉ
    email: string; // Email
    facebook: string; // Facebook
  }; // Thông tin liên hệ

  @Prop({
    type: {
      salaryType: String,
      baseSalary: Number,
      shiftRate: Number,
      hourlyRate: Number,
      dailyRate: Number,
      overtimeRate: Number,
    },
  })
  salarySettings: {
    salaryType: string; // Loại lương: 'shift', 'hourly', 'daily', 'fixed'
    baseSalary: number; // Lương cơ bản (nếu cố định)
    shiftRate: number; // Lương theo ca
    hourlyRate: number; // Lương theo giờ
    dailyRate: number; // Lương theo ngày công
    overtimeRate: number; // Tỷ lệ làm thêm giờ
  }; // Thiết lập lương

  @Prop({
    type: {
      bonusType: String,
      bonusRate: Number,
      bonusScope: String,
    },
  })
  bonusSettings: {
    bonusType: string; // Loại thưởng: 'revenue', 'branchProfit', 'totalProfit'
    bonusRate: number; // Tỷ lệ thưởng
    bonusScope: string; // Phạm vi: 'personal', 'branch', 'system'
  }; // Thiết lập thưởng

  @Prop({
    type: {
      commissionRate: Number,
    },
  })
  commissionSettings: {
    commissionRate: number; // Tỷ lệ hoa hồng
  }; // Thiết lập hoa hồng

  @Prop({ type: [{ name: String, amount: Number, type: String }] })
  allowanceSettings: { name: string; amount: number; type: string }[]; // Phụ cấp

  @Prop({ type: [{ name: String, amount: Number, condition: String }] })
  deductionSettings: { name: string; amount: number; condition: string }[]; // Giảm trừ

  @Prop({ enum: ['active', 'inactive'], default: 'active' })
  status: string; // Trạng thái

  @Prop()
  notes: string; // Ghi chú

  @Prop({ default: Date.now })
  createdAt: Date; // Thời gian tạo
}
export const EmployeeSchema = SchemaFactory.createForClass(Employee);