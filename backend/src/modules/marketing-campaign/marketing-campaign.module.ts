import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MarketingCampaignSchema } from './schemas/marketing-campaign.schema';
import { MarketingCampaignController } from './controllers/marketing-campaign.controller';
import { MarketingCampaignService } from './services/marketing-campaign.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'MarketingCampaigns', schema: MarketingCampaignSchema }])
  ],
  controllers: [MarketingCampaignController],
  providers: [MarketingCampaignService],
  exports: [MarketingCampaignService]
})
export class MarketingCampaignModule { }
