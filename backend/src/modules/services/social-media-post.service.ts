import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SocialMediaPost } from '../schemas/social-media-post.schema';

@Injectable()
export class SocialMediaPostService {
  constructor(
    @InjectModel(SocialMediaPost.name)
    private socialMediaPostModel: Model<SocialMediaPost>,
  ) { }

  async create(createSocialMediaPostDto: any): Promise<SocialMediaPost> {
    const createdPost = new this.socialMediaPostModel(createSocialMediaPostDto);
    return createdPost.save();
  }

  async findAll(): Promise<SocialMediaPost[]> {
    return this.socialMediaPostModel.find().exec();
  }

  async findOne(id: string): Promise<SocialMediaPost> {
    const post = await this.socialMediaPostModel.findById(id).exec();
    if (!post) {
      throw new NotFoundException(`Social media post with ID ${id} not found`);
    }
    return post;
  }

  async update(id: string, updateSocialMediaPostDto: any): Promise<SocialMediaPost> {
    const post = await this.socialMediaPostModel
      .findByIdAndUpdate(id, updateSocialMediaPostDto, { new: true })
      .exec();
    if (!post) {
      throw new NotFoundException(`Social media post with ID ${id} not found`);
    }
    return post;
  }

  async remove(id: string): Promise<SocialMediaPost> {
    const post = await this.socialMediaPostModel.findByIdAndDelete(id).exec();
    if (!post) {
      throw new NotFoundException(`Social media post with ID ${id} not found`);
    }
    return post;
  }

  async findByStore(storeId: string): Promise<SocialMediaPost[]> {
    return this.socialMediaPostModel.find({ storeId }).exec();
  }

  async findByChannel(channelId: string): Promise<SocialMediaPost[]> {
    return this.socialMediaPostModel.find({ channelId }).exec();
  }

  async findScheduledPosts(): Promise<SocialMediaPost[]> {
    return this.socialMediaPostModel
      .find({
        'schedule.isScheduled': true,
        'schedule.scheduledTime': { $gt: new Date() },
        status: 'Đã lên lịch'
      })
      .exec();
  }
}