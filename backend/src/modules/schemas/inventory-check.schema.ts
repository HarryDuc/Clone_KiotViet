import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class InventoryCheckItem {
  @Prop({ type: Types.ObjectId, ref: 'Products', required: true })
  productId: Types.ObjectId;

  @Prop({ required: true })
  systemQuantity: number;

  @Prop({ required: true })
  actualQuantity: number;

  @Prop()
  difference: number;

  @Prop()
  unitPrice: number;

  @Prop()
  totalValue: number;

  @Prop()
  notes: string;
}

export const InventoryCheckItemSchema = SchemaFactory.createForClass(InventoryCheckItem);

@Schema({ timestamps: true })
export class InventoryCheck extends Document {
  @Prop({ unique: true })
  checkId: string;

  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  storeId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  warehouseId: Types.ObjectId;

  @Prop({ required: true })
  checkDate: Date;

  @Prop({ enum: ['Định kỳ', 'Đột xuất', 'Theo yêu cầu'], required: true })
  type: string;

  @Prop({ enum: ['Draft', 'In Progress', 'Completed', 'Cancelled'], default: 'Draft' })
  status: string;

  @Prop({ type: [InventoryCheckItemSchema] })
  items: InventoryCheckItem[];

  @Prop({ default: 0 })
  totalItems: number;

  @Prop({ default: 0 })
  totalValue: number;

  @Prop({ default: 0 })
  totalDifference: number;

  @Prop({ type: Types.ObjectId, ref: 'Employees', required: true })
  checkedBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Employees' })
  verifiedBy: Types.ObjectId;

  @Prop([String])
  attachments: string[];

  @Prop()
  notes: string;
}

export const InventoryCheckSchema = SchemaFactory.createForClass(InventoryCheck);

InventoryCheckSchema.index({ storeId: 1 });
InventoryCheckSchema.index({ warehouseId: 1 });
InventoryCheckSchema.index({ checkDate: 1 });
InventoryCheckSchema.index({ status: 1 });
InventoryCheckSchema.index({ 'items.productId': 1 });