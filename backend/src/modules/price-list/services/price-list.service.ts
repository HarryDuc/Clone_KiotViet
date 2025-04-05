import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PriceList } from '../schemas/price-list.schema';
import { CreatePriceListDTO, UpdatePriceListDTO } from '../dtos/price-list.dto';
@Injectable()
export class PriceListService {
  constructor(
    @InjectModel('PriceLists') private priceListModel: Model<PriceList>,
  ) { }

  async create(createPriceListDto: CreatePriceListDTO): Promise<PriceList> {
    const createdPriceList = new this.priceListModel(createPriceListDto);
    return createdPriceList.save();
  }

  async findAll(): Promise<PriceList[]> {
    return this.priceListModel
      .find()
      .populate('branch')
      .populate('createdBy')
      .populate('products')
      .exec();
  }

  async findOne(id: string): Promise<PriceList> {
    const priceList = await this.priceListModel
      .findById(id)
      .populate('branch')
      .populate('createdBy')
      .populate('products')
      .exec();
    if (!priceList) {
      throw new NotFoundException(`Price list with ID ${id} not found`);
    }
    return priceList;
  }

  async update(id: string, updatePriceListDto: UpdatePriceListDTO): Promise<PriceList> {
    const priceList = await this.priceListModel
      .findByIdAndUpdate(id, updatePriceListDto, { new: true })
      .populate('branch')
      .populate('createdBy')
      .populate('products')
      .exec();
    if (!priceList) {
      throw new NotFoundException(`Price list with ID ${id} not found`);
    }
    return priceList;
  }

  async remove(id: string): Promise<PriceList> {
    const priceList = await this.priceListModel.findByIdAndDelete(id).exec();
    if (!priceList) {
      throw new NotFoundException(`Price list with ID ${id} not found`);
    }
    return priceList;
  }
}