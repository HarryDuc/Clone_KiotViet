import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Store } from '../schemas/store.schema';
import { CreateStoreDTO, UpdateStoreDTO } from '../dtos/store.dto';
@Injectable()
export class StoreService {
  constructor(
    @InjectModel('Stores') private storeModel: Model<Store>,
  ) {}

  async create(createStoreDto: CreateStoreDTO): Promise<Store> {
    const lastStore = await this.storeModel.findOne().sort({ storeId: -1 }).exec();
    let newStoreId = 'ST0001';
  
    if (lastStore && lastStore.storeId) {
      const lastNumber = parseInt(lastStore.storeId.replace('ST', ''), 10);
      const nextNumber = lastNumber + 1;
      newStoreId = `ST${nextNumber.toString().padStart(4, '0')}`;
    }
  
    const createdStore = new this.storeModel({
      ...createStoreDto,
      storeId: newStoreId
    });
  
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

  async update(id: string, updateStoreDto: UpdateStoreDTO): Promise<Store> {
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