import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSocialMediaPostDTO, UpdateSocialMediaPostDTO } from '../dtos/social-media-post.dto';
import { SocialMediaPost } from '../schemas/social-media-post.schema';

@Injectable()
export class SocialMediaPostService {
  constructor(
    @InjectModel('SocialMediaPosts')
    private socialMediaPostModel: Model<SocialMediaPost>,
  ) { }

  async create(createSocialMediaPostDto: CreateSocialMediaPostDTO): Promise<SocialMediaPost> {
    const lastSocialMediaPost = await this.socialMediaPostModel.findOne().sort({ postId: -1 }).exec();
    let newSocialMediaPostId = 'SMP00001';
  
    if (lastSocialMediaPost && lastSocialMediaPost.postId) {
      const lastNumber = parseInt(lastSocialMediaPost.postId.replace('SMP', ''), 10);
      const nextNumber = lastNumber + 1;
      newSocialMediaPostId = `SMP${nextNumber.toString().padStart(5, '0')}`;
    }
  
    const createdSocialMediaPost = new this.socialMediaPostModel({
      ...createSocialMediaPostDto,
      postId: newSocialMediaPostId
    });
  
    return createdSocialMediaPost.save();
  }

  async findAll(query: any = {}): Promise<SocialMediaPost[]> {
    return this.socialMediaPostModel.find(query).exec();
  }

  async findOne(id: string): Promise<SocialMediaPost> {
    const socialMediaPost = await this.socialMediaPostModel.findById(id).exec();
    if (!socialMediaPost) {
      throw new NotFoundException(`Social media post with ID ${id} not found`);
    }
    return socialMediaPost;
  }

  async update(id: string, updateSocialMediaPostDto: UpdateSocialMediaPostDTO): Promise<SocialMediaPost> {
    const socialMediaPost = await this.socialMediaPostModel
      .findByIdAndUpdate(id, updateSocialMediaPostDto, { new: true })
      .exec();
    if (!socialMediaPost) {
      throw new NotFoundException(`Social media post with ID ${id} not found`);
    }
    return socialMediaPost;
  }

  async remove(id: string): Promise<SocialMediaPost> {
    const socialMediaPost = await this.socialMediaPostModel.findByIdAndDelete(id).exec();
    if (!socialMediaPost) {
      throw new NotFoundException(`Social media post with ID ${id} not found`);
    }
    return socialMediaPost;
  }

  async updateStatus(id: string, status: string): Promise<SocialMediaPost> {
    const socialMediaPost = await this.socialMediaPostModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
    if (!socialMediaPost) {
      throw new NotFoundException(`Social media post with ID ${id} not found`);
    }
    return socialMediaPost;
  }

  async updateTracking(id: string, tracking: any): Promise<SocialMediaPost> {
    const socialMediaPost = await this.socialMediaPostModel
      .findByIdAndUpdate(id, { tracking }, { new: true })
      .exec();
    if (!socialMediaPost) {
      throw new NotFoundException(`Social media post with ID ${id} not found`);
    }
    return socialMediaPost;
  }

  async updateCarrier(id: string, carrierId: string): Promise<SocialMediaPost> {
    const socialMediaPost = await this.socialMediaPostModel
      .findByIdAndUpdate(id, { carrier: carrierId }, { new: true })
      .exec();
    if (!socialMediaPost) {
      throw new NotFoundException(`Social media post with ID ${id} not found`);
    }
    return socialMediaPost;
  }

  async findByStore(storeId: string): Promise<SocialMediaPost[]> {
    return this.socialMediaPostModel.find({ storeId }).exec();
  }

  async findByOrder(orderId: string): Promise<SocialMediaPost[]> {
    return this.socialMediaPostModel.find({ order: orderId }).exec();
  }
}