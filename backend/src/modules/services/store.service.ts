import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Store } from '../schemas/store.schema';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store.name) private storeModel: Model<Store>,
  ) {}

  async create(createStoreDto: any): Promise<Store> {
    const createdStore = new this.storeModel(createStoreDto);
    return createdStore.save();
  }

  async findAll(): Promise<Store[]> {
    return this.storeModel.find().populate('servicePackage').exec();
  }

  async findOne(id: string): Promise<Store> {
    const store = await this.storeModel.findById(id).populate('servicePackage').exec();
    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }
    return store;
  }

  async update(id: string, updateStoreDto: any): Promise<Store> {
    const store = await this.storeModel
      .findByIdAndUpdate(id, updateStoreDto, { new: true })
      .populate('servicePackage')
      .exec();
    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }
    return store;
  }

  async remove(id: string): Promise<Store> {
    const store = await this.storeModel.findByIdAndDelete(id).exec();
    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }
    return store;
  }
}