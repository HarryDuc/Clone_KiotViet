import mongoose from "mongoose";

const inventoryCheckSchema = new mongoose.Schema({
  checkId: { type: String, unique: true }, // Mã kiểm kê
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stores",
    required: true,
  },
  warehouseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stores",
    required: true,
  },
  checkDate: { type: Date, required: true }, // Ngày kiểm kê
  type: {
    type: String,
    enum: ["Định kỳ", "Đột xuất", "Theo yêu cầu"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Draft", "In Progress", "Completed", "Cancelled"],
    default: "Draft",
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
      systemQuantity: { type: Number, required: true }, // Số lượng theo hệ thống
      actualQuantity: { type: Number, required: true }, // Số lượng thực tế
      difference: { type: Number }, // Chênh lệch
      unitPrice: { type: Number }, // Đơn giá
      totalValue: { type: Number }, // Tổng giá trị
      notes: { type: String }, // Ghi chú
    },
  ],
  totalItems: { type: Number, default: 0 }, // Tổng số sản phẩm
  totalValue: { type: Number, default: 0 }, // Tổng giá trị
  totalDifference: { type: Number, default: 0 }, // Tổng chênh lệch
  checkedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employees",
    required: true,
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employees",
  },
  attachments: [{ type: String }], // Tệp đính kèm
  notes: { type: String }, // Ghi chú
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Indexes
inventoryCheckSchema.index({ storeId: 1 });
inventoryCheckSchema.index({ warehouseId: 1 });
inventoryCheckSchema.index({ checkDate: 1 });
inventoryCheckSchema.index({ status: 1 });
inventoryCheckSchema.index({ "items.productId": 1 });

export default mongoose.model("InventoryChecks", inventoryCheckSchema);
