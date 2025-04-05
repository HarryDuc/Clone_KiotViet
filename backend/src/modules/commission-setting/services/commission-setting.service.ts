import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CommissionSetting } from '../schemas/commission-setting.schema';
import { CreateCommissionSettingDTO } from '../dtos/commisson-setting.dto';

@Injectable()
export class CommissionSettingService {
  constructor(
    @InjectModel('CommissionSettings')
    private commissionSettingModel: Model<CommissionSetting>,
  ) {}

  async create(createCommissionSettingDto: CreateCommissionSettingDTO): Promise<CommissionSetting> {
    // Convert string IDs to ObjectIds in details array
    if (createCommissionSettingDto.details) {
      createCommissionSettingDto.details = createCommissionSettingDto.details.map((detail) => ({
        ...detail,
        productId: detail.productId.toString()
      }));
    }

    const lastCommissionSetting = await this.commissionSettingModel
      .findOne()
      .sort({ commissionId: -1 })
      .exec();
    let newCommissionSettingId = 'CMS00001';

    if (lastCommissionSetting && lastCommissionSetting.commissionId) {
      const lastNumber = parseInt(
        lastCommissionSetting.commissionId.replace('CMS', ''),
        10,
      );
      const nextNumber = lastNumber + 1;
      newCommissionSettingId = `CMS${nextNumber.toString().padStart(5, '0')}`;
    }

    const createdCommissionSetting = new this.commissionSettingModel({
      ...createCommissionSettingDto,
      commissionId: newCommissionSettingId,
    });

    return createdCommissionSetting.save();
  }

  async findAll(): Promise<CommissionSetting[]> {
    return this.commissionSettingModel.find().exec();
  }

  async findOne(id: string): Promise<CommissionSetting> {
    const commissionSetting = await this.commissionSettingModel
      .findById(id)
      .exec();
    if (!commissionSetting) {
      throw new NotFoundException(`Commission setting with ID ${id} not found`);
    }
    return commissionSetting;
  }

  async update(
    id: string,
    updateCommissionSettingDto: CreateCommissionSettingDTO,
  ): Promise<CommissionSetting> {
    // Convert string IDs to ObjectIds in details array if present
    if (updateCommissionSettingDto.details) {
      updateCommissionSettingDto.details =
        updateCommissionSettingDto.details.map((detail) => ({
          ...detail,
          productId: detail.productId.toString()
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
    const commissionSetting = await this.commissionSettingModel
      .findByIdAndDelete(id)
      .exec();
    if (!commissionSetting) {
      throw new NotFoundException(`Commission setting with ID ${id} not found`);
    }
    return commissionSetting;
  }
}
