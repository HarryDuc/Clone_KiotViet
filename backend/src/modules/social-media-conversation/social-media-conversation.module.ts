import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SocialMediaConversationSchema } from './schemas/social-media-conversation.schema';
import { SocialMediaConversationController } from './controllers/social-media-conversation.controller';
import { SocialMediaConversationService } from './services/social-media-conversation.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'SocialMediaConversations', schema: SocialMediaConversationSchema }])
  ],
  controllers: [SocialMediaConversationController],
  providers: [SocialMediaConversationService],
  exports: [SocialMediaConversationService]
})
export class SocialMediaConversationModule { }
