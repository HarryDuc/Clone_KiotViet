export class WorkScheduleDTO {
  scheduleId: string; // Thêm
  storeId: string;
  employeeId: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  shiftName: string; // Sửa từ shift thành shiftName
  status: string;
  isHoliday: boolean; // Thêm
  repeatSettings: { repeat: boolean; daysOfWeek: string[]; endRepeat: Date }; // Thêm
  notes: string; // Thêm
  createdAt: Date;
}

export class CreateWorkScheduleDTO {
  storeId: string;
  employeeId: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  shiftName: string; // Sửa từ shift thành shiftName
  status: string;
  isHoliday?: boolean; // Tùy chọn
  repeatSettings?: { repeat: boolean; daysOfWeek: string[]; endRepeat: Date }; // Tùy chọn
  notes?: string; // Tùy chọn
}

export class UpdateWorkScheduleDTO {
  date?: Date;
  startTime?: Date;
  endTime?: Date;
  shiftName?: string; // Sửa từ shift thành shiftName
  status?: string;
  isHoliday?: boolean; // Tùy chọn
  repeatSettings?: { repeat: boolean; daysOfWeek: string[]; endRepeat: Date }; // Tùy chọn
  notes?: string; // Tùy chọn
}