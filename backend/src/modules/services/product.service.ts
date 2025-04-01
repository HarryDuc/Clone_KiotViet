import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Products') private productModel: Model<Product>,
  ) { }

  async create(createProductDto: any): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().populate('category').populate('brand').exec();
  }

  async findOne(id: string): Promise<Product | null> {
    const product = await this.productModel.findById(id).populate('category').populate('brand').exec();
    if (!product) {
      return null;
    }
    return product;
  }

  async update(id: string, updateProductDto: any): Promise<Product | null> {
    return this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .populate('category')
      .populate('brand')
      .exec();
  }

  async remove(id: string): Promise<Product | null> {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
