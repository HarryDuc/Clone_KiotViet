import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Branch } from './branch.schema';
import { User } from './user.schema';
import { Product } from './product.schema';

export type PriceListDocument = PriceList & Document;

@Schema({ timestamps: true })
export class PriceList {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Branch', required: true })
  branch: Branch;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  createdBy: User;

  @Prop({ required: true })
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({
    type: [{
      product: { type: MongooseSchema.Types.ObjectId, ref: 'Product' },
      price: Number,
      discountType: { type: String, enum: ['percentage', 'fixed'] },
      discountValue: Number,
      finalPrice: Number
    }]
  })
  products: Array<{
    product: Product;
    price: number;
    discountType?: string;
    discountValue?: number;
    finalPrice: number;
  }>;

  @Prop({ default: 'active', enum: ['active', 'inactive', 'expired'] })
  status: string;

  @Prop({ type: Object })
  metadata: {
    customerGroup?: string;
    minimumQuantity?: number;
    maximumQuantity?: number;
  };

  @Prop()
  note: string;
}

export const PriceListSchema = SchemaFactory.createForClass(PriceList);