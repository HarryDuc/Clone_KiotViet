import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WorkSchedule } from '../schemas/work-schedule.schema';
import { CreateWorkScheduleDTO, UpdateWorkScheduleDTO } from '../dtos/work-schedule.dto';

@Injectable()
export class WorkScheduleService {
  constructor(
    @InjectModel(WorkSchedule.name)
    private workScheduleModel: Model<WorkSchedule>,
  ) { }

  async create(createWorkScheduleDto: CreateWorkScheduleDTO): Promise<WorkSchedule> {
    const lastWorkSchedule = await this.workScheduleModel.findOne().sort({ scheduleId: -1 }).exec();
    let newScheduleId = 'SCH00001';
  
    if (lastWorkSchedule && lastWorkSchedule.scheduleId) {
      const lastNumber = parseInt(lastWorkSchedule.scheduleId.replace('SCH', ''), 10);
      const nextNumber = lastNumber + 1;
      newScheduleId = `SCH${nextNumber.toString().padStart(5, '0')}`;
    }
  
    const createdWorkSchedule = new this.workScheduleModel({
      ...createWorkScheduleDto,
      scheduleId: newScheduleId
    });
  
    return createdWorkSchedule.save();
  }

  async findAll(): Promise<WorkSchedule[]> {
    return this.workScheduleModel.find().exec();
  }

  async findOne(id: string): Promise<WorkSchedule> {
    const schedule = await this.workScheduleModel.findById(id).exec();
    if (!schedule) {
      throw new NotFoundException(`Work schedule with ID ${id} not found`);
    }
    return schedule;
  }

  async update(id: string, updateWorkScheduleDto: UpdateWorkScheduleDTO): Promise<WorkSchedule> {
    const schedule = await this.workScheduleModel
      .findByIdAndUpdate(id, updateWorkScheduleDto, { new: true })
      .exec();
    if (!schedule) {
      throw new NotFoundException(`Work schedule with ID ${id} not found`);
    }
    return schedule;
  }

  async remove(id: string): Promise<WorkSchedule> {
    const schedule = await this.workScheduleModel.findByIdAndDelete(id).exec();
    if (!schedule) {
      throw new NotFoundException(`Work schedule with ID ${id} not found`);
    }
    return schedule;
  }

  async findByStore(storeId: string): Promise<WorkSchedule[]> {
    return this.workScheduleModel.find({ storeId }).exec();
  }

  async findByEmployee(employeeId: string): Promise<WorkSchedule[]> {
    return this.workScheduleModel.find({ employeeId }).exec();
  }

  async findSpecialSchedulesByDate(date: Date): Promise<WorkSchedule[]> {
    return this.workScheduleModel
      .find({
        'specialSchedules.date': {
          $gte: new Date(date.setHours(0, 0, 0, 0)),
          $lt: new Date(date.setHours(23, 59, 59, 999))
        }
      })
      .exec();
  }

  async updateSpecialSchedule(
    id: string,
    specialSchedule: {
      date: Date;
      isWorking: boolean;
      startTime: string;
      endTime: string;
      breakTime: string;
      reason: string;
    }
  ): Promise<WorkSchedule> {
    const schedule = await this.workScheduleModel.findById(id);
    if (!schedule) {
      throw new NotFoundException(`Work schedule with ID ${id} not found`);
    }

    const existingScheduleIndex = (schedule as any).specialSchedules.findIndex(
      s => s.date.getTime() === specialSchedule.date.getTime()
    );
    if (existingScheduleIndex >= 0) {
      (schedule as any).specialSchedules[existingScheduleIndex] = specialSchedule;
    } else {
      (schedule as any).specialSchedules.push(specialSchedule);
    }

    return schedule.save();
  }
}