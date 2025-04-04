import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'WebsiteSettings' })
export class WebsiteSettings extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  storeId: Types.ObjectId;

  @Prop({ required: true })
  domain: string;

  @Prop()
  logo: string;

  @Prop()
  favicon: string;

  @Prop({ type: { title: String, description: String, keywords: [String] } })
  seo: { title: string; description: string; keywords: string[] };

  @Prop({ type: { currency: String, language: String, timezone: String } })
  general: { currency: string; language: string; timezone: string };

  @Prop({ type: { methods: [String], defaultMethod: String } })
  payment: { methods: string[]; defaultMethod: string };

  @Prop({ type: { carriers: [String], defaultCarrier: String } })
  shipping: { carriers: string[]; defaultCarrier: string };

  @Prop({ type: { facebook: String, twitter: String, instagram: String } })
  social: { facebook: string; twitter: string; instagram: string };

  @Prop({ type: { header: String, footer: String, css: String } })
  customization: { header: string; footer: string; css: string };

  // Trường mới
  @Prop([String])
  languages: string[];

  @Prop({ type: { googleAnalytics: String, facebookPixel: String } })
  thirdPartyServices: { googleAnalytics: string; facebookPixel: string };
}

export const WebsiteSettingsSchema = SchemaFactory.createForClass(WebsiteSettings);