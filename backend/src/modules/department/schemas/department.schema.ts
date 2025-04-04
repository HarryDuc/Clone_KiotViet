import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'Departments' })
export class Department extends Document {
  @Prop({ unique: true, required: true })
  departmentId: string; // Mã phòng ban

  @Prop({ required: true })
  name: string; // Tên phòng ban

  @Prop()
  description: string; // Mô tả

  @Prop({ enum: ['active', 'inactive'], default: 'active' })
  status: string; // Trạng thái

  @Prop({ default: Date.now })
  createdAt: Date; // Thời gian tạo
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);