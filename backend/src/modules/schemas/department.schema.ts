import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'Departments' })
export class Department extends Document {
  @Prop({ unique: true })
  departmentId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ enum: ['Hoạt động', 'Ngừng hoạt động'], default: 'Hoạt động' })
  status: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);