import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'Users' })
export class User extends Document {
  @Prop({ unique: true })
  userId: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  fullName: string;

  @Prop()
  role: string;

  @Prop({ type: Types.ObjectId, ref: 'Branches' })
  branch: Types.ObjectId;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);