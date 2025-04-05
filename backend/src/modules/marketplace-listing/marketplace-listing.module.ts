import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MarketplaceListingSchema } from './schemas/marketplace-listing.schema';
import { MarketplaceListingController } from './controllers/marketplace-listing.controller';
import { MarketplaceListingService } from './services/marketplace-listing.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'MarketplaceListings', schema: MarketplaceListingSchema }
    ])
  ],
  controllers: [MarketplaceListingController],
  providers: [MarketplaceListingService],
  exports: [MarketplaceListingService]
})
export class MarketplaceListingModule { }