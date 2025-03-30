import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Branch } from './branch.schema';

export type WebsiteSettingsDocument = WebsiteSettings & Document;

@Schema({ timestamps: true })
export class WebsiteSettings {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Stores', required: true })
  storeId: Branch;

  @Prop({ required: true })
  siteName: string;

  @Prop()
  logo: string;

  @Prop()
  favicon: string;

  @Prop()
  description: string;

  @Prop({ type: [String] })
  keywords: string[];

  @Prop({ type: Object })
  contact: {
    phone: string;
    email: string;
    address: string;
    workingHours: string;
  };

  @Prop({ type: Object })
  socialMedia: {
    facebook: string;
    instagram: string;
    youtube: string;
    tiktok: string;
    zalo: string;
  };

  @Prop({ type: Object })
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogImage: string;
    robots: string;
    sitemap: boolean;
  };

  @Prop({ type: Object })
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    customCSS: string;
  };

  @Prop({ type: Object })
  security: {
    ssl: boolean;
    maintenanceMode: boolean;
    allowedIPs: string[];
  };

  @Prop({ type: Object })
  integrations: {
    googleAnalytics: string;
    facebookPixel: string;
    chatWidget: boolean;
  };

  @Prop({
    type: String,
    enum: ['Đang hoạt động', 'Bảo trì', 'Tạm ngưng'],
    default: 'Đang hoạt động'
  })
  status: string;
}

export const WebsiteSettingsSchema = SchemaFactory.createForClass(WebsiteSettings);

// Add indexes
WebsiteSettingsSchema.index({ storeId: 1 });
