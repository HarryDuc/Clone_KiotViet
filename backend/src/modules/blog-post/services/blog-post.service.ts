import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogPost } from '../blog-post/schemas/blog-post.schema';

@Injectable()
export class BlogPostService {
  constructor(
    @InjectModel(BlogPost.name) private blogPostModel: Model<BlogPost>,
  ) { }

  async create(createBlogPostDto: any): Promise<BlogPost> {
    const createdPost = new this.blogPostModel(createBlogPostDto);
    return createdPost.save();
  }

  async findAll(query: any = {}): Promise<BlogPost[]> {
    return this.blogPostModel.find(query).exec();
  }

  async findOne(id: string): Promise<BlogPost> {
    const post = await this.blogPostModel.findById(id).exec();
    if (!post) {
      throw new NotFoundException(`Blog post with ID ${id} not found`);
    }
    return post;
  }

  async findBySlug(slug: string): Promise<BlogPost> {
    const post = await this.blogPostModel.findOne({ slug }).exec();
    if (!post) {
      throw new NotFoundException(`Blog post with slug ${slug} not found`);
    }
    return post;
  }

  async update(id: string, updateBlogPostDto: any): Promise<BlogPost> {
    const post = await this.blogPostModel
      .findByIdAndUpdate(id, updateBlogPostDto, { new: true })
      .exec();
    if (!post) {
      throw new NotFoundException(`Blog post with ID ${id} not found`);
    }
    return post;
  }

  async remove(id: string): Promise<BlogPost> {
    const post = await this.blogPostModel.findByIdAndDelete(id).exec();
    if (!post) {
      throw new NotFoundException(`Blog post with ID ${id} not found`);
    }
    return post;
  }

}