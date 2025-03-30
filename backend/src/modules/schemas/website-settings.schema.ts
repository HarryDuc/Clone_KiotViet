import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class WebsiteSettings extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  storeId: Types.ObjectId;

  @Prop({ required: true })
  siteName: string;

  @Prop()
  logo: string;

  @Prop()
  favicon: string;

  @Prop()
  description: string;

  @Prop([String])
  keywords: string[];

  @Prop({
    type: {
      phone: String,
      email: String,
      address: String,
      workingHours: String,
    },
  })
  contact: {
    phone: string;
    email: string;
    address: string;
    workingHours: string;
  };

  @Prop({
    type: {
      facebook: String,
      instagram: String,
      youtube: String,
      tiktok: String,
      zalo: String,
    },
  })
  socialMedia: {
    facebook: string;
    instagram: string;
    youtube: string;
    tiktok: string;
    zalo: string;
  };

  @Prop({
    type: {
      metaTitle: String,
      metaDescription: String,
      ogImage: String,
      robots: String,
      sitemap: { type: Boolean, default: true },
    },
  })
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogImage: string;
    robots: string;
    sitemap: boolean;
  };

  @Prop({
    type: {
      primaryColor: String,
      secondaryColor: String,
      fontFamily: String,
      customCSS: String,
    },
  })
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    customCSS: string;
  };

  @Prop({
    type: {
      ssl: { type: Boolean, default: true },
      maintenanceMode: { type: Boolean, default: false },
      allowedIPs: [String],
    },
  })
  security: {
    ssl: boolean;
    maintenanceMode: boolean;
    allowedIPs: string[];
  };

  @Prop({
    type: {
      googleAnalytics: String,
      facebookPixel: String,
      chatWidget: { type: Boolean, default: true },
    },
  })
  integrations: {
    googleAnalytics: string;
    facebookPixel: string;
    chatWidget: boolean;
  };

  @Prop({ enum: ['Đang hoạt động', 'Bảo trì', 'Tạm ngưng'], default: 'Đang hoạt động' })
  status: string;
}

export const WebsiteSettingsSchema = SchemaFactory.createForClass(WebsiteSettings);

WebsiteSettingsSchema.index({ storeId: 1 });