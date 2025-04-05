import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SocialMediaPostController } from './controllers/social-media-post.controller';
import { SocialMediaPostService } from './services/social-media-post.service';
import { SocialMediaPostSchema } from './schemas/social-media-post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'SocialMediaPosts', schema: SocialMediaPostSchema }
    ])
  ],
  controllers: [SocialMediaPostController],
  providers: [SocialMediaPostService],
  exports: [SocialMediaPostService]
})
export class SocialMediaPostModule { }