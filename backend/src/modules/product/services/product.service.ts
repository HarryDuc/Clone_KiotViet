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
    const lastUser = await this.productModel.findOne().sort({ productId: -1 }).exec();
    let newProductId = 'SP0001';
  
    if (lastUser && lastUser.productId) {
      const lastNumber = parseInt(lastUser.productId.replace('SP', ''), 10);
      const nextNumber = lastNumber + 1;
      newProductId = `SP${nextNumber.toString().padStart(4, '0')}`;
    }
  
    const createdProduct = new this.productModel({
      ...createProductDto,
      productId: newProductId
    });
  
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    try {
      const products = await this.productModel.find().exec();
      
      // Populate category and brand only if they exist
      const populatedProducts = await Promise.all(
        products.map(async (product) => {
          if (product.category) {
            await product.populate('category');
          }
          if (product.brand) {
            await product.populate('brand');
          }
          return product;
        })
      );
      
      return populatedProducts;
    } catch (error) {
      console.error('Error in findAll:', error);
      throw error;
    }
  }

  async findOne(id: string): Promise<Product | null> {
    try {
      const product = await this.productModel.findById(id).exec();
      if (!product) {
        return null;
      }
      
      if (product.category) {
        await product.populate('category');
      }
      if (product.brand) {
        await product.populate('brand');
      }
      
      return product;
    } catch (error) {
      console.error('Error in findOne:', error);
      throw error;
    }
  }

  async update(id: string, updateProductDto: any): Promise<Product | null> {
    try {
      const product = await this.productModel
        .findByIdAndUpdate(id, updateProductDto, { new: true })
        .exec();
        
      if (!product) {
        return null;
      }
      
      if (product.category) {
        await product.populate('category');
      }
      if (product.brand) {
        await product.populate('brand');
      }
      
      return product;
    } catch (error) {
      console.error('Error in update:', error);
      throw error;
    }
  }

  async remove(id: string): Promise<Product | null> {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
