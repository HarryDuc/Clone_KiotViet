// CashBookDTO: Đại diện toàn bộ schema
export class CashBookDTO {
    cashBookId: string; // Mã sổ quỹ
    storeId: string; // Mã cửa hàng
    type: string; // Loại giao dịch
    category: string; // Danh mục
    amount: number; // Số tiền
    paymentMethod: string; // Phương thức thanh toán
    reference: string; // Tham chiếu
    referenceId: string; // Mã tham chiếu
    description: string; // Mô tả
    date: Date; // Ngày giao dịch
    employeeId: string; // Mã nhân viên
    attachments: string[]; // Tệp đính kèm
    status: string; // Trạng thái
    notes: string; // Ghi chú
  }
  
  // CreateCashBookDTO: Dùng để tạo mới
  export class CreateCashBookDTO {
    storeId: string; // Mã cửa hàng
    type: string; // Loại giao dịch
    category: string; // Danh mục
    amount: number; // Số tiền
    paymentMethod: string; // Phương thức thanh toán
    reference: string; // Tham chiếu
    referenceId: string; // Mã tham chiếu
    description: string; // Mô tả
    date: Date; // Ngày giao dịch
    employeeId: string; // Mã nhân viên
    attachments: string[]; // Tệp đính kèm
    status: string; // Trạng thái
    notes: string; // Ghi chú
  }
  
  // UpdateCashBookDTO: Dùng để cập nhật
  export class UpdateCashBookDTO {
    type?: string; // Loại giao dịch
    category?: string; // Danh mục
    amount?: number; // Số tiền
    paymentMethod?: string; // Phương thức thanh toán
    reference?: string; // Tham chiếu
    referenceId?: string; // Mã tham chiếu
    description?: string; // Mô tả
    date?: Date; // Ngày giao dịch
    employeeId?: string; // Mã nhân viên
    attachments?: string[]; // Tệp đính kèm
    status?: string; // Trạng thái
    notes?: string; // Ghi chú
  }