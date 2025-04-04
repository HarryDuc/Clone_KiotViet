export class WebsiteSettingsDTO {
  storeId: string;
  domain: string;
  logo: string;
  favicon: string;
  seo: { title: string; description: string; keywords: string[] };
  general: { currency: string; language: string; timezone: string };
  payment: { methods: string[]; defaultMethod: string };
  shipping: { carriers: string[]; defaultCarrier: string };
  social: { facebook: string; twitter: string; instagram: string };
  customization: { header: string; footer: string; css: string };
  languages: string[]; // Thêm
  thirdPartyServices: { googleAnalytics: string; facebookPixel: string }; // Thêm
}

export class CreateWebsiteSettingsDTO {
  storeId: string;
  domain: string;
  logo: string;
  favicon: string;
  seo: { title: string; description: string; keywords: string[] };
  general: { currency: string; language: string; timezone: string };
  payment: { methods: string[]; defaultMethod: string };
  shipping: { carriers: string[]; defaultCarrier: string };
  social: { facebook: string; twitter: string; instagram: string };
  customization: { header: string; footer: string; css: string };
  languages?: string[]; // Tùy chọn
  thirdPartyServices?: { googleAnalytics: string; facebookPixel: string }; // Tùy chọn
}

export class UpdateWebsiteSettingsDTO {
  domain?: string;
  logo?: string;
  favicon?: string;
  seo?: { title?: string; description?: string; keywords?: string[] };
  general?: { currency?: string; language?: string; timezone?: string };
  payment?: { methods?: string[]; defaultMethod?: string };
  shipping?: { carriers?: string[]; defaultCarrier?: string };
  social?: { facebook?: string; twitter?: string; instagram?: string };
  customization?: { header?: string; footer?: string; css?: string };
  languages?: string[]; // Tùy chọn
  thirdPartyServices?: { googleAnalytics?: string; facebookPixel?: string }; // Tùy chọn
}