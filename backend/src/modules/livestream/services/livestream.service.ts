import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LiveStream } from '../schemas/livestream.schema';
import { CreateLiveStreamDTO, UpdateLiveStreamDTO } from '../dtos/livestream.dto';

@Injectable()
export class LivestreamService {
  constructor(
    @InjectModel('LiveStreams') private livestreamModel: Model<LiveStream>,
  ) { }

  async create(createLiveStreamDto: CreateLiveStreamDTO): Promise<LiveStream> {
    const created = new this.livestreamModel(createLiveStreamDto);
    return created.save();
  }

  async findAll(): Promise<LiveStream[]> {
    return this.livestreamModel
      .find()
      .populate('storeId')
      .populate('orderId')
      .populate('customerId')
      .populate('items.productId')
      .exec();
  }

  async findOne(id: string): Promise<LiveStream> {
    const livestream = await this.livestreamModel
      .findById(id)
      .populate('storeId')
      .populate('orderId')
      .populate('customerId')
      .populate('items.productId')
      .exec();
    if (!livestream) {
      throw new NotFoundException(`Livestream with ID ${id} not found`);
    }
    return livestream;
  }

  async update(id: string, updateLivestreamDto: UpdateLiveStreamDTO): Promise<LiveStream> {
    const livestream = await this.livestreamModel
      .findByIdAndUpdate(id, updateLivestreamDto, { new: true })
      .populate('storeId')
      .populate('orderId')
      .populate('customerId')
      .populate('items.productId')
      .exec();
    if (!livestream) {
      throw new NotFoundException(`Livestream with ID ${id} not found`);
    }
    return livestream;
  }

  async remove(id: string): Promise<LiveStream> {
    const livestream = await this.livestreamModel.findByIdAndDelete(id).exec();
    if (!livestream) {
      throw new NotFoundException(`Livestream with ID ${id} not found`);
    }
    return livestream;
  }
}