import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'Positions' })
export class Position extends Document {
  @Prop({ unique: true })
  positionId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ enum: ['Hoạt động', 'Ngừng hoạt động'], default: 'Hoạt động' })
  status: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const PositionSchema = SchemaFactory.createForClass(Position);