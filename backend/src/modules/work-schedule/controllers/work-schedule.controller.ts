import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { WorkScheduleService } from '../services/work-schedule.service';
import { WorkSchedule } from '../schemas/work-schedule.schema';
import { CreateWorkScheduleDTO, UpdateWorkScheduleDTO } from '../dtos/work-schedule.dto';
@Controller('work-schedules')
export class WorkScheduleController {
  constructor(private readonly workScheduleService: WorkScheduleService) { }

  @Post()
  create(@Body() createWorkScheduleDto: CreateWorkScheduleDTO) {
    return this.workScheduleService.create(createWorkScheduleDto);
  }

  @Get()
  findAll() {
    return this.workScheduleService.findAll();
  }

  @Get('store/:storeId')
  findByStore(@Param('storeId') storeId: string) {
    return this.workScheduleService.findByStore(storeId);
  }

  @Get('employee/:employeeId')
  findByEmployee(@Param('employeeId') employeeId: string) {
    return this.workScheduleService.findByEmployee(employeeId);
  }

  @Get('special-schedules')
  findSpecialSchedulesByDate(@Query('date') date: string) {
    return this.workScheduleService.findSpecialSchedulesByDate(new Date(date));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workScheduleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkScheduleDto: UpdateWorkScheduleDTO) {
    return this.workScheduleService.update(id, updateWorkScheduleDto);
  }

  @Patch(':id/special-schedule')
  updateSpecialSchedule(
    @Param('id') id: string,
    @Body() specialSchedule: {
      date: Date;
      isWorking: boolean;
      startTime: string;
      endTime: string;
      breakTime: string;
      reason: string;
    }
  ) {
    return this.workScheduleService.updateSpecialSchedule(id, specialSchedule);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workScheduleService.remove(id);
  }
}