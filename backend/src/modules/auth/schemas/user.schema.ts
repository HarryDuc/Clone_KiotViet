import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'Users' })
export class User extends Document {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  fullName: string; // Họ tên

  @Prop({ required: true })
  phone: string; // Số điện thoại

  @Prop({ enum: ['admin', 'employee'], default: 'employee' })
  role: string; // Vai trò: admin (chủ cửa hàng) hoặc employee (nhân viên)

  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  storeId: Types.ObjectId; // Liên kết với cửa hàng

  @Prop({ default: false })
  isAdmin: boolean; // Chỉ tài khoản chính mới là true

  @Prop({ default: Date.now })
  createdAt: Date;

  // Các trường tùy chọn khác (từ gợi ý trước)
  @Prop({ match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/ })
  email?: string;

  @Prop({ type: [String], default: [] })
  permissions?: string[];

  @Prop({ default: 'vi' })
  language?: string;

  @Prop({ enum: ['local', 'google', 'facebook'], default: 'local' })
  authProvider?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);