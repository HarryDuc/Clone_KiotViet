// HolidayDTO: Đại diện toàn bộ schema
export class HolidayDTO {
  storeId: string; // Mã cửa hàng
  name: string; // Tên ngày lễ
  type: string; // Loại
  startDate: Date; // Ngày bắt đầu
  endDate: Date; // Ngày kết thúc
  duration: number; // Thời gian
  description: string; // Mô tả
  isRecurring: boolean; // Lặp lại
  recurringPattern: {
    frequency: string; // Tần suất
    interval: number; // Khoảng cách
    endAfter: Date; // Kết thúc sau
  };
  status: string; // Trạng thái
}

// CreateHolidayDTO: Dùng để tạo mới
export class CreateHolidayDTO {
  storeId: string; // Mã cửa hàng
  name: string; // Tên ngày lễ
  type: string; // Loại
  startDate: Date; // Ngày bắt đầu
  endDate: Date; // Ngày kết thúc
  duration: number; // Thời gian
  description: string; // Mô tả
  isRecurring: boolean; // Lặp lại
  recurringPattern: {
    frequency: string; // Tần suất
    interval: number; // Khoảng cách
    endAfter: Date; // Kết thúc sau
  };
  status: string; // Trạng thái
}

// UpdateHolidayDTO: Dùng để cập nhật
export class UpdateHolidayDTO {
  name?: string; // Tên ngày lễ
  type?: string; // Loại
  startDate?: Date; // Ngày bắt đầu
  endDate?: Date; // Ngày kết thúc
  duration?: number; // Thời gian
  description?: string; // Mô tả
  isRecurring?: boolean; // Lặp lại
  recurringPattern?: {
    frequency?: string; // Tần suất
    interval?: number; // Khoảng cách
    endAfter?: Date; // Kết thúc sau
  };
  status?: string; // Trạng thái
}