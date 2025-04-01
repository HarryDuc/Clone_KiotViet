import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CommissionSetting } from '../schemas/commission-setting.schema';

@Injectable()
export class CommissionSettingService {
  constructor(
    @InjectModel(CommissionSetting.name) private commissionSettingModel: Model<CommissionSetting>,
  ) { }

  async create(createCommissionSettingDto: any): Promise<CommissionSetting> {
    // Convert string IDs to ObjectIds in details array
    if (createCommissionSettingDto.details) {
      createCommissionSettingDto.details = createCommissionSettingDto.details.map(detail => ({
        ...detail,
        productId: new Types.ObjectId(detail.productId)
      }));
    }

    const createdCommissionSetting = new this.commissionSettingModel(createCommissionSettingDto);
    return createdCommissionSetting.save();
  }

  async findAll(): Promise<CommissionSetting[]> {
    return this.commissionSettingModel.find().exec();
  }

  async findOne(id: string): Promise<CommissionSetting> {
    const commissionSetting = await this.commissionSettingModel.findById(id).exec();
    if (!commissionSetting) {
      throw new NotFoundException(`Commission setting with ID ${id} not found`);
    }
    return commissionSetting;
  }

  async update(id: string, updateCommissionSettingDto: any): Promise<CommissionSetting> {
    // Convert string IDs to ObjectIds in details array if present
    if (updateCommissionSettingDto.details) {
      updateCommissionSettingDto.details = updateCommissionSettingDto.details.map(detail => ({
        ...detail,
        productId: new Types.ObjectId(detail.productId)
      }));
    }

    const commissionSetting = await this.commissionSettingModel
      .findByIdAndUpdate(id, updateCommissionSettingDto, { new: true })
      .exec();
    if (!commissionSetting) {
      throw new NotFoundException(`Commission setting with ID ${id} not found`);
    }
    return commissionSetting;
  }

  async remove(id: string): Promise<CommissionSetting> {
    const commissionSetting = await this.commissionSettingModel.findByIdAndDelete(id).exec();
    if (!commissionSetting) {
      throw new NotFoundException(`Commission setting with ID ${id} not found`);
    }
    return commissionSetting;
  }
}