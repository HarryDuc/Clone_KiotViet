import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'Stores' })
export class Store extends Document {
  @Prop({ unique: true, required: true })
  storeId: string;

  @Prop({ enum: ['Cá nhân', 'Doanh nghiệp'] })
  accountType: string;

  @Prop({ required: true })
  representative: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  email: string;

  @Prop({ enum: ['Nam', 'Nữ', 'Khác'] })
  gender: string;

  @Prop()
  dob: Date;

  @Prop()
  idCard: string;

  @Prop()
  issueDate: Date;

  @Prop()
  issuePlace: string;

  @Prop()
  address: string;

  @Prop({ required: true })
  storeName: string;

  @Prop()
  industry: string;

  @Prop({ default: 0 })
  branchCount: number;

  @Prop({ default: 0 })
  employeeCount: number;

  @Prop({ enum: ['Đang sử dụng', 'Ngừng sử dụng'], default: 'Đang sử dụng' })
  status: string;

  @Prop()
  expirationDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'ServicePackages' })
  servicePackage: Types.ObjectId;

  @Prop({ default: 0 })
  warehouseCount: number;
}

export const StoreSchema = SchemaFactory.createForClass(Store);