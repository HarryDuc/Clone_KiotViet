import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SaleChannel } from '../schemas/sale-channel.schema';
import { CreateSalesChannelDTO, UpdateSalesChannelDTO } from '../dtos/sale-channel.dto';
@Injectable()
export class SaleChannelService {
  constructor(
    @InjectModel('SaleChannels') private SaleChannelModel: Model<SaleChannel>,
  ) { }

  async create(createSaleChannelDto: CreateSalesChannelDTO): Promise<SaleChannel> {
    return this.SaleChannelModel.create(createSaleChannelDto);
  }

  async findAll(): Promise<SaleChannel[]> {
    return this.SaleChannelModel.find().exec();
  }

  async findOne(id: string): Promise<SaleChannel> {
    const SaleChannel = await this.SaleChannelModel.findById(id).exec();
    if (!SaleChannel) {
        throw new NotFoundException(`SaleChannel with ID ${id} not found`);
    }
    return SaleChannel;
  }

  async update(id: string, updateSalesChannelDto: UpdateSalesChannelDTO): Promise<SaleChannel> {
    const SaleChannel = await this.SaleChannelModel
      .findByIdAndUpdate(id, updateSalesChannelDto, { new: true })
      .exec();
    if (!SaleChannel) {
      throw new NotFoundException(`SaleChannel with ID ${id} not found`);
    }
    return SaleChannel;
  }

  async remove(id: string): Promise<SaleChannel> {
    const SaleChannel = await this.SaleChannelModel.findByIdAndDelete(id).exec();
    if (!SaleChannel) {
      throw new NotFoundException(`SaleChannel with ID ${id} not found`);
    }
    return SaleChannel;
  }
}