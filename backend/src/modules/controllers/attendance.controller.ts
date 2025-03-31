import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AttendanceService } from '../services/attendance.service';
import { CreateAttendanceDto } from '../dto/create-attendance.dto';
import { UpdateAttendanceDto } from '../dto/update-attendance.dto';
import { Attendance } from '../schemas/attendance.schema';

@Controller('attendances')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  // POST: Thêm mới attendance
  @Post()
  async create(@Body() createAttendanceDto: CreateAttendanceDto): Promise<Attendance> {
    return this.attendanceService.create(createAttendanceDto);
  }

  // GET: Lấy tất cả attendance
  @Get()
  async findAll(): Promise<Attendance[]> {
    return this.attendanceService.findAll();
  }

  // GET: Lấy một attendance theo ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Attendance> {
    return this.attendanceService.findOne(id);
  }

  // PUT: Cập nhật attendance
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateAttendanceDto: UpdateAttendanceDto): Promise<Attendance> {
    return this.attendanceService.update(id, updateAttendanceDto);
  }

  // DELETE: Xóa attendance
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Attendance> {
    return this.attendanceService.remove(id);
  }
}