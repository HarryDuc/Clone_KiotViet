import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LiveStreamSchema } from './schemas/livestream.schema';
import { LivestreamController } from './controllers/livestream.controller';
import { LivestreamService } from './services/livestream.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'LiveStreams', schema: LiveStreamSchema }])
  ],
  controllers: [LivestreamController],
  providers: [LivestreamService],
  exports: [LivestreamService]
})
export class LivestreamModule { }
