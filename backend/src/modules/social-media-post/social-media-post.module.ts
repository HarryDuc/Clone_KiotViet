import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SocialMediaPostController } from './social-media-post.controller';
import { SocialMediaPostService } from './social-media-post.service';
import { SocialMediaPost, SocialMediaPostSchema } from './social-media-post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SocialMediaPost.name, schema: SocialMediaPostSchema }
    ])
  ],
  controllers: [SocialMediaPostController],
  providers: [SocialMediaPostService],
  exports: [SocialMediaPostService]
})
export class SocialMediaPostModule { }