-- 1. Bảng Brands
CREATE TABLE Brands (
  brandId VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Bảng Branches
CREATE TABLE Branches (
  branchId VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(255) NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. Bảng CarrierGroups
CREATE TABLE CarrierGroups (
  groupId VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. Bảng Carriers
CREATE TABLE Carriers (
  carrierId VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(100),
  address TEXT,
  groupId VARCHAR(50),
  totalOrders INT DEFAULT 0,
  totalFees DECIMAL(10,2) DEFAULT 0,
  status ENUM('Đang hoạt động', 'Ngừng hoạt động') DEFAULT 'Đang hoạt động',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 5. Bảng CashBooks
CREATE TABLE CashBooks (
  cashBookId VARCHAR(50) PRIMARY KEY,
  storeId VARCHAR(50) NOT NULL,
  type ENUM('Thu', 'Chi') NOT NULL,
  category ENUM('Thu từ bán hàng', 'Thu từ khác', 'Chi mua hàng', 'Chi lương', 'Chi vận chuyển', 'Chi marketing', 'Chi khác') NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  paymentMethod ENUM('Tiền mặt', 'Chuyển khoản', 'Thẻ tín dụng', 'Ví điện tử') NOT NULL,
  reference ENUM('Đơn hàng', 'Hóa đơn', 'Phiếu nhập', 'Phiếu xuất', 'Khác') NOT NULL,
  referenceId VARCHAR(50),
  description TEXT,
  date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  employeeId VARCHAR(50) NOT NULL,
  attachments TEXT,
  status ENUM('Đã xác nhận', 'Chờ xác nhận', 'Đã hủy') DEFAULT 'Chờ xác nhận',
  notes TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 6. Bảng Categories
CREATE TABLE Categories (
  categoryId VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  parentCategoryId VARCHAR(50),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 7. Bảng CommissionSettings
CREATE TABLE CommissionSettings (
  commissionId VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  scope ENUM('Toàn hệ thống', 'Chi nhánh'),
  branchId VARCHAR(50),
  status ENUM('Áp dụng', 'Ngừng áp dụng') DEFAULT 'Áp dụng',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 8. Bảng CommissionDetails
CREATE TABLE CommissionDetails (
  commissionDetailId INT AUTO_INCREMENT PRIMARY KEY,
  commissionId VARCHAR(50),
  productId VARCHAR(50),
  rate DECIMAL(5,2)
);

-- 9. Bảng Customers
CREATE TABLE Customers (
  customerId VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(100),
  address TEXT,
  customerType ENUM('Cá nhân', 'Công ty'),
  taxCode VARCHAR(50),
  idCard VARCHAR(20),
  groupId VARCHAR(50),
  debt DECIMAL(10,2) DEFAULT 0,
  totalSales DECIMAL(10,2) DEFAULT 0,
  status ENUM('Đang hoạt động', 'Ngừng hoạt động') DEFAULT 'Đang hoạt động',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 10. Bảng Departments
CREATE TABLE Departments (
  departmentId VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  status ENUM('Hoạt động', 'Ngừng hoạt động') DEFAULT 'Hoạt động',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 11. Bảng Employees
CREATE TABLE Employees (
  employeeId VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(100),
  address TEXT,
  branchSalaryId VARCHAR(50),
  branchWorkId VARCHAR(50),
  startDate DATE,
  positionId VARCHAR(50),
  departmentId VARCHAR(50),
  userAccountId VARCHAR(50),
  idCard VARCHAR(20),
  dob DATE,
  gender ENUM('Nam', 'Nữ', 'Khác'),
  salaryType ENUM('Theo ca', 'Theo giờ', 'Theo ngày công', 'Cố định'),
  shiftRate DECIMAL(10,2),
  hourlyRate DECIMAL(10,2),
  dailyRate DECIMAL(10,2),
  fixedRate DECIMAL(10,2),
  commission DECIMAL(10,2),
  commissionTableId VARCHAR(50),
  status ENUM('Đang làm việc', 'Đã nghỉ') DEFAULT 'Đang làm việc',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 12. Bảng Bonuses
CREATE TABLE Bonuses (
  bonusId INT AUTO_INCREMENT PRIMARY KEY,
  employeeId VARCHAR(50),
  type ENUM('Doanh thu cá nhân', 'Lợi nhuận chi nhánh', 'Lợi nhuận gộp'),
  form ENUM('Tổng doanh thu', 'Bậc thang doanh thu', 'Vượt doanh thu'),
  value DECIMAL(10,2)
);

-- 13. Bảng Allowances
CREATE TABLE Allowances (
  allowanceId INT AUTO_INCREMENT PRIMARY KEY,
  employeeId VARCHAR(50),
  name VARCHAR(100),
  type ENUM('Theo ngày', 'Hàng tháng cố định', 'Hàng tháng tính trên ngày công'),
  value DECIMAL(10,2),
  valueType ENUM('VND', '%')
);

-- 14. Bảng Deductions
CREATE TABLE Deductions (
  deductionId INT AUTO_INCREMENT PRIMARY KEY,
  employeeId VARCHAR(50),
  name VARCHAR(100),
  type ENUM('Đi muộn', 'Về sớm', 'Cố định'),
  deductionCondition ENUM('Theo số lần', 'Theo phút'),
  value DECIMAL(10,2)
);

-- 15. Bảng Holidays
CREATE TABLE Holidays (
  holidayId VARCHAR(50) PRIMARY KEY,
  storeId VARCHAR(50) NOT NULL,
  name VARCHAR(100) NOT NULL,
  type ENUM('Ngày lễ', 'Ngày đặc biệt', 'Sự kiện của công ty') NOT NULL,
  startDate DATE NOT NULL,
  endDate DATE NOT NULL,
  duration INT,
  description TEXT,
  isRecurring BOOLEAN DEFAULT FALSE,
  frequency ENUM('Hàng năm', 'Hàng tháng', 'Hàng tuần'),
  recurringInterval INT,
  endAfter DATE,
  status ENUM('Đang hoạt động', 'Ngừng hoạt động') DEFAULT 'Đang hoạt động',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 16. Bảng Invoices
CREATE TABLE Invoices (
  invoiceId VARCHAR(50) PRIMARY KEY,
  storeId VARCHAR(50) NOT NULL,
  orderId VARCHAR(50) NOT NULL,
  customerId VARCHAR(50) NOT NULL,
  invoiceNumber VARCHAR(50) NOT NULL,
  invoiceDate DATETIME NOT NULL,
  dueDate DATETIME,
  subtotal DECIMAL(10,2) NOT NULL,
  tax DECIMAL(10,2) DEFAULT 0,
  shipping DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  paymentMethod ENUM('Tiền mặt', 'Chuyển khoản', 'Thẻ tín dụng', 'Ví điện tử') NOT NULL,
  paymentStatus ENUM('Chưa thanh toán', 'Đã thanh toán một phần', 'Đã thanh toán', 'Đã hủy') DEFAULT 'Chưa thanh toán',
  notes TEXT,
  status ENUM('Draft', 'Issued', 'Cancelled', 'Void') DEFAULT 'Draft',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 17. Bảng InvoiceItems
CREATE TABLE InvoiceItems (
  invoiceItemId INT AUTO_INCREMENT PRIMARY KEY,
  invoiceId VARCHAR(50),
  productId VARCHAR(50),
  quantity INT NOT NULL,
  unitPrice DECIMAL(10,2) NOT NULL,
  discount DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL
);

-- 18. Bảng Orders
CREATE TABLE Orders (
  orderId VARCHAR(50) PRIMARY KEY,
  orderCode VARCHAR(50) UNIQUE,
  customerId VARCHAR(50),
  totalAmount DECIMAL(10,2),
  discount DECIMAL(10,2) DEFAULT 0,
  paymentMethod ENUM('Tiền mặt', 'Chuyển khoản', 'Thẻ', 'Ví'),
  status ENUM('Phiếu tạm thời', 'Đã xác nhận', 'Đang giao hàng', 'Hoàn thành', 'Đã hủy') DEFAULT 'Phiếu tạm thời',
  channelId VARCHAR(50),
  carrierId VARCHAR(50),
  deliveryDate DATE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 19. Bảng OrderProducts
CREATE TABLE OrderProducts (
  orderProductId INT AUTO_INCREMENT PRIMARY KEY,
  orderId VARCHAR(50),
  productId VARCHAR(50),
  quantity INT,
  price DECIMAL(10,2),
  discount DECIMAL(10,2) DEFAULT 0
);

-- 20. Bảng Payrolls
CREATE TABLE Payrolls (
  payrollId VARCHAR(50) PRIMARY KEY,
  employeeId VARCHAR(50),
  month INT,
  year INT,
  basicSalary DECIMAL(10,2),
  bonus DECIMAL(10,2) DEFAULT 0,
  commission DECIMAL(10,2) DEFAULT 0,
  allowance DECIMAL(10,2) DEFAULT 0,
  deduction DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2),
  paid DECIMAL(10,2) DEFAULT 0,
  status ENUM('Đang tạo', 'Tạm tính', 'Đã chốt lương', 'Đã hủy') DEFAULT 'Đang tạo',
  branchId VARCHAR(50),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 21. Bảng Positions
CREATE TABLE Positions (
  positionId VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  status ENUM('Hoạt động', 'Ngừng hoạt động') DEFAULT 'Hoạt động',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 22. Bảng Products
CREATE TABLE Products (
  productId VARCHAR(50) PRIMARY KEY,
  barcode VARCHAR(50),
  name VARCHAR(100) NOT NULL,
  categoryId VARCHAR(50),
  brandId VARCHAR(50),
  price DECIMAL(10,2) NOT NULL,
  cost DECIMAL(10,2),
  stock INT DEFAULT 0,
  location VARCHAR(100),
  minStock INT,
  maxStock INT,
  status ENUM('Cho phép kinh doanh', 'Ngừng kinh doanh') DEFAULT 'Cho phép kinh doanh',
  image VARCHAR(255),
  weight DECIMAL(10,2),
  unit VARCHAR(50),
  description TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 23. Bảng PurchaseOrders
CREATE TABLE PurchaseOrders (
  purchaseOrderId VARCHAR(50) PRIMARY KEY,
  purchaseOrderCode VARCHAR(50),
  supplierId VARCHAR(50),
  totalAmount DECIMAL(10,2),
  status ENUM('Phiếu tạm thời', 'Đã nhập hàng', 'Đã hủy') DEFAULT 'Phiếu tạm thời',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 24. Bảng PurchaseOrderProducts
CREATE TABLE PurchaseOrderProducts (
  purchaseOrderProductId INT AUTO_INCREMENT PRIMARY KEY,
  purchaseOrderId VARCHAR(50),
  productId VARCHAR(50),
  quantity INT,
  price DECIMAL(10,2)
);

-- 25. Bảng Returns
CREATE TABLE Returns (
  returnId VARCHAR(50) PRIMARY KEY,
  returnCode VARCHAR(50),
  orderId VARCHAR(50),
  reason TEXT,
  totalRefund DECIMAL(10,2),
  status ENUM('Đã trả', 'Đã hủy') DEFAULT 'Đã trả',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 26. Bảng ReturnProducts
CREATE TABLE ReturnProducts (
  returnProductId INT AUTO_INCREMENT PRIMARY KEY,
  returnId VARCHAR(50),
  productId VARCHAR(50),
  quantity INT
);

-- 27. Bảng Shipments
CREATE TABLE Shipments (
  shipmentId VARCHAR(50) PRIMARY KEY,
  storeId VARCHAR(50) NOT NULL,
  orderId VARCHAR(50) NOT NULL,
  customerId VARCHAR(50) NOT NULL,
  shippingMethod ENUM('Giao hàng nhanh', 'Giao hàng tiết kiệm', 'Viettel Post', 'Grab Express', 'Tự giao') NOT NULL,
  trackingNumber VARCHAR(100),
  shippingFee DECIMAL(10,2) NOT NULL,
  estimatedDeliveryDate DATE,
  actualDeliveryDate DATE,
  shippingAddressFullName VARCHAR(100) NOT NULL,
  shippingAddressPhone VARCHAR(20) NOT NULL,
  shippingAddressAddress VARCHAR(255) NOT NULL,
  shippingAddressWard VARCHAR(100),
  shippingAddressDistrict VARCHAR(100),
  shippingAddressCity VARCHAR(100),
  shippingAddressProvince VARCHAR(100),
  shippingAddressCountry VARCHAR(100) DEFAULT 'Việt Nam',
  status ENUM('Chờ xử lý', 'Đã nhận đơn', 'Đang vận chuyển', 'Đã giao hàng', 'Giao hàng thất bại', 'Đã hủy') DEFAULT 'Chờ xử lý',
  notes TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 28. Bảng TrackingHistories
CREATE TABLE TrackingHistories (
  trackingHistoryId INT AUTO_INCREMENT PRIMARY KEY,
  shipmentId VARCHAR(50),
  status VARCHAR(100) NOT NULL,
  location VARCHAR(255),
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  note TEXT
);

-- 29. Bảng Stores
CREATE TABLE Stores (
  storeId VARCHAR(50) PRIMARY KEY,
  accountType ENUM('Cá nhân', 'Doanh nghiệp'),
  representative VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(100),
  gender ENUM('Nam', 'Nữ', 'Khác'),
  dob DATE,
  idCard VARCHAR(20),
  issueDate DATE,
  issuePlace VARCHAR(100),
  address TEXT,
  storeName VARCHAR(100) NOT NULL,
  industry VARCHAR(100),
  branchCount INT DEFAULT 0,
  employeeCount INT DEFAULT 0,
  status ENUM('Đang sử dụng', 'Ngừng sử dụng') DEFAULT 'Đang sử dụng',
  expirationDate DATE,
  servicePackageId VARCHAR(50),
  warehouseCount INT DEFAULT 0,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 30. Bảng SupplierGroups
CREATE TABLE SupplierGroups (
  groupId VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 31. Bảng Suppliers
CREATE TABLE Suppliers (
  supplierId VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(100),
  address TEXT,
  groupId VARCHAR(50),
  debt DECIMAL(10,2) DEFAULT 0,
  totalPurchases DECIMAL(10,2) DEFAULT 0,
  status ENUM('Đang hoạt động', 'Ngừng hoạt động') DEFAULT 'Đang hoạt động',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 32. Bảng Users
CREATE TABLE Users (
  userId VARCHAR(50) PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  fullName VARCHAR(100),
  role VARCHAR(50),
  branchId VARCHAR(50),
  email VARCHAR(100),
  phone VARCHAR(20),
  isAdmin BOOLEAN DEFAULT FALSE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 33. Bảng Attendances
CREATE TABLE Attendances (
  attendanceId VARCHAR(50) PRIMARY KEY,
  employeeId VARCHAR(50),
  date DATE,
  checkIn DATETIME,
  checkOut DATETIME,
  status ENUM('Đúng giờ', 'Đi muộn', 'Về sớm', 'Chưa chấm công', 'Nghỉ làm'),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Khóa ngoại cho bảng Carriers
ALTER TABLE Carriers
ADD CONSTRAINT fk_carriers_groupId
FOREIGN KEY (groupId) REFERENCES CarrierGroups(groupId);

-- Khóa ngoại cho bảng CashBooks
ALTER TABLE CashBooks
ADD CONSTRAINT fk_cashbooks_storeId
FOREIGN KEY (storeId) REFERENCES Stores(storeId);

ALTER TABLE CashBooks
ADD CONSTRAINT fk_cashbooks_employeeId
FOREIGN KEY (employeeId) REFERENCES Employees(employeeId);

-- Khóa ngoại cho bảng Categories (tự tham chiếu)
ALTER TABLE Categories
ADD CONSTRAINT fk_categories_parentCategoryId
FOREIGN KEY (parentCategoryId) REFERENCES Categories(categoryId);

-- Khóa ngoại cho bảng CommissionSettings
ALTER TABLE CommissionSettings
ADD CONSTRAINT fk_commissionsettings_branchId
FOREIGN KEY (branchId) REFERENCES Branches(branchId);

-- Khóa ngoại cho bảng CommissionDetails
ALTER TABLE CommissionDetails
ADD CONSTRAINT fk_commissiondetails_commissionId
FOREIGN KEY (commissionId) REFERENCES CommissionSettings(commissionId);

ALTER TABLE CommissionDetails
ADD CONSTRAINT fk_commissiondetails_productId
FOREIGN KEY (productId) REFERENCES Products(productId);

-- Khóa ngoại cho bảng Employees
ALTER TABLE Employees
ADD CONSTRAINT fk_employees_branchSalaryId
FOREIGN KEY (branchSalaryId) REFERENCES Branches(branchId);

ALTER TABLE Employees
ADD CONSTRAINT fk_employees_branchWorkId
FOREIGN KEY (branchWorkId) REFERENCES Branches(branchId);

ALTER TABLE Employees
ADD CONSTRAINT fk_employees_positionId
FOREIGN KEY (positionId) REFERENCES Positions(positionId);

ALTER TABLE Employees
ADD CONSTRAINT fk_employees_departmentId
FOREIGN KEY (departmentId) REFERENCES Departments(departmentId);

ALTER TABLE Employees
ADD CONSTRAINT fk_employees_userAccountId
FOREIGN KEY (userAccountId) REFERENCES Users(userId);

ALTER TABLE Employees
ADD CONSTRAINT fk_employees_commissionTableId
FOREIGN KEY (commissionTableId) REFERENCES CommissionSettings(commissionId);

-- Khóa ngoại cho bảng Bonuses
ALTER TABLE Bonuses
ADD CONSTRAINT fk_bonuses_employeeId
FOREIGN KEY (employeeId) REFERENCES Employees(employeeId);

-- Khóa ngoại cho bảng Allowances
ALTER TABLE Allowances
ADD CONSTRAINT fk_allowances_employeeId
FOREIGN KEY (employeeId) REFERENCES Employees(employeeId);

-- Khóa ngoại cho bảng Deductions
ALTER TABLE Deductions
ADD CONSTRAINT fk_deductions_employeeId
FOREIGN KEY (employeeId) REFERENCES Employees(employeeId);

-- Khóa ngoại cho bảng Holidays
ALTER TABLE Holidays
ADD CONSTRAINT fk_holidays_storeId
FOREIGN KEY (storeId) REFERENCES Stores(storeId);

-- Khóa ngoại cho bảng Invoices
ALTER TABLE Invoices
ADD CONSTRAINT fk_invoices_storeId
FOREIGN KEY (storeId) REFERENCES Stores(storeId);

ALTER TABLE Invoices
ADD CONSTRAINT fk_invoices_orderId
FOREIGN KEY (orderId) REFERENCES Orders(orderId);

ALTER TABLE Invoices
ADD CONSTRAINT fk_invoices_customerId
FOREIGN KEY (customerId) REFERENCES Customers(customerId);

-- Khóa ngoại cho bảng InvoiceItems
ALTER TABLE InvoiceItems
ADD CONSTRAINT fk_invoiceitems_invoiceId
FOREIGN KEY (invoiceId) REFERENCES Invoices(invoiceId);

ALTER TABLE InvoiceItems
ADD CONSTRAINT fk_invoiceitems_productId
FOREIGN KEY (productId) REFERENCES Products(productId);

-- Khóa ngoại cho bảng Orders
ALTER TABLE Orders
ADD CONSTRAINT fk_orders_customerId
FOREIGN KEY (customerId) REFERENCES Customers(customerId);

ALTER TABLE Orders
ADD CONSTRAINT fk_orders_carrierId
FOREIGN KEY (carrierId) REFERENCES Carriers(carrierId);

-- Khóa ngoại cho bảng OrderProducts
ALTER TABLE OrderProducts
ADD CONSTRAINT fk_orderproducts_orderId
FOREIGN KEY (orderId) REFERENCES Orders(orderId);

ALTER TABLE OrderProducts
ADD CONSTRAINT fk_orderproducts_productId
FOREIGN KEY (productId) REFERENCES Products(productId);

-- Khóa ngoại cho bảng Payrolls
ALTER TABLE Payrolls
ADD CONSTRAINT fk_payrolls_employeeId
FOREIGN KEY (employeeId) REFERENCES Employees(employeeId);

ALTER TABLE Payrolls
ADD CONSTRAINT fk_payrolls_branchId
FOREIGN KEY (branchId) REFERENCES Branches(branchId);

-- Khóa ngoại cho bảng Products
ALTER TABLE Products
ADD CONSTRAINT fk_products_categoryId
FOREIGN KEY (categoryId) REFERENCES Categories(categoryId);

ALTER TABLE Products
ADD CONSTRAINT fk_products_brandId
FOREIGN KEY (brandId) REFERENCES Brands(brandId);

-- Khóa ngoại cho bảng PurchaseOrders
ALTER TABLE PurchaseOrders
ADD CONSTRAINT fk_purchaseorders_supplierId
FOREIGN KEY (supplierId) REFERENCES Suppliers(supplierId);

-- Khóa ngoại cho bảng PurchaseOrderProducts
ALTER TABLE PurchaseOrderProducts
ADD CONSTRAINT fk_purchaseorderproducts_purchaseOrderId
FOREIGN KEY (purchaseOrderId) REFERENCES PurchaseOrders(purchaseOrderId);

ALTER TABLE PurchaseOrderProducts
ADD CONSTRAINT fk_purchaseorderproducts_productId
FOREIGN KEY (productId) REFERENCES Products(productId);

-- Khóa ngoại cho bảng Returns
ALTER TABLE Returns
ADD CONSTRAINT fk_returns_orderId
FOREIGN KEY (orderId) REFERENCES Orders(orderId);

-- Khóa ngoại cho bảng ReturnProducts
ALTER TABLE ReturnProducts
ADD CONSTRAINT fk_returnproducts_returnId
FOREIGN KEY (returnId) REFERENCES Returns(returnId);

ALTER TABLE ReturnProducts
ADD CONSTRAINT fk_returnproducts_productId
FOREIGN KEY (productId) REFERENCES Products(productId);

-- Khóa ngoại cho bảng Shipments
ALTER TABLE Shipments
ADD CONSTRAINT fk_shipments_storeId
FOREIGN KEY (storeId) REFERENCES Stores(storeId);

ALTER TABLE Shipments
ADD CONSTRAINT fk_shipments_orderId
FOREIGN KEY (orderId) REFERENCES Orders(orderId);

ALTER TABLE Shipments
ADD CONSTRAINT fk_shipments_customerId
FOREIGN KEY (customerId) REFERENCES Customers(customerId);

-- Khóa ngoại cho bảng TrackingHistories
ALTER TABLE TrackingHistories
ADD CONSTRAINT fk_trackinghistories_shipmentId
FOREIGN KEY (shipmentId) REFERENCES Shipments(shipmentId);

-- Khóa ngoại cho bảng Suppliers
ALTER TABLE Suppliers
ADD CONSTRAINT fk_suppliers_groupId
FOREIGN KEY (groupId) REFERENCES SupplierGroups(groupId);

-- Khóa ngoại cho bảng Users
ALTER TABLE Users
ADD CONSTRAINT fk_users_branchId
FOREIGN KEY (branchId) REFERENCES Branches(branchId);

-- Khóa ngoại cho bảng Attendances
ALTER TABLE Attendances
ADD CONSTRAINT fk_attendances_employeeId
FOREIGN KEY (employeeId) REFERENCES Employees(employeeId);