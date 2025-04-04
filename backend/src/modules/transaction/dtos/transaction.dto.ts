export class TransactionDTO {
  transactionId: string;
  storeId: string;
  amount: number;
  type: string;
  status: string;
  createdAt: Date;
  details: { productId: string; quantity: number }[]; // Thêm
  accountId: string; // Thêm
}

export class CreateTransactionDTO {
  storeId: string;
  amount: number;
  type: string;
  status: string;
  details?: { productId: string; quantity: number }[]; // Tùy chọn
  accountId?: string; // Tùy chọn
}

export class UpdateTransactionDTO {
  amount?: number;
  type?: string;
  status?: string;
  details?: { productId: string; quantity: number }[]; // Tùy chọn
  accountId?: string; // Tùy chọn
}