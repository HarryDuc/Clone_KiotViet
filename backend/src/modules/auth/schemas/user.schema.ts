import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
@Schema({ collection: 'Users' })
export class User extends Document {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  fullName: string;

  @Prop({ enum: ['admin', 'user', 'employee'], default: 'employee' })
  role: string;
  

  @Prop({ type: Types.ObjectId, ref: 'Branches' })
  branch: Types.ObjectId;

  @Prop({ match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/ })
  email: string;
  

  @Prop()
  phone: string;

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);