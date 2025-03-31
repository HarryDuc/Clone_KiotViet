CREATE TABLE ServicePackages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    packageId VARCHAR(255) UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    features JSON, -- Mảng các chuỗi, dùng JSON cho đơn giản
    price DECIMAL(10, 2) NOT NULL,
    durationOptions JSON, -- Mảng các số, dùng JSON
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Stores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    storeId VARCHAR(255) UNIQUE,
    accountType ENUM('Cá nhân', 'Doanh nghiệp'),
    representative VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    gender ENUM('Nam', 'Nữ', 'Khác'),
    dob DATE,
    idCard VARCHAR(20),
    issueDate DATE,
    issuePlace VARCHAR(255),
    address TEXT,
    storeName VARCHAR(255) NOT NULL,
    industry VARCHAR(255),
    branchCount INT DEFAULT 0,
    employeeCount INT DEFAULT 0,
    status ENUM('Đang sử dụng', 'Ngừng sử dụng') DEFAULT 'Đang sử dụng',
    expirationDate DATE,
    servicePackageId INT,
    warehouseCount INT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Branches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Brands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    brandId VARCHAR(255) UNIQUE,
    name VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoryId VARCHAR(255) UNIQUE,
    name VARCHAR(255) NOT NULL,
    parentCategoryId INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE CustomerGroups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    groupId VARCHAR(255) UNIQUE,
    name VARCHAR(255) NOT NULL,
    discountType ENUM('VND', '%'),
    discountValue DECIMAL(10, 2),
    description TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customerId VARCHAR(255) UNIQUE,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    address TEXT,
    customerType ENUM('Cá nhân', 'Công ty'),
    taxCode VARCHAR(50),
    idCard VARCHAR(20),
    groupId INT,
    debt DECIMAL(10, 2) DEFAULT 0,
    totalSales DECIMAL(10, 2) DEFAULT 0,
    status ENUM('Đang hoạt động', 'Ngừng hoạt động') DEFAULT 'Đang hoạt động',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    departmentId VARCHAR(255) UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('Hoạt động', 'Ngừng hoạt động') DEFAULT 'Hoạt động',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Positions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    positionId VARCHAR(255) UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('Hoạt động', 'Ngừng hoạt động') DEFAULT 'Hoạt động',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId VARCHAR(255) UNIQUE,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    fullName VARCHAR(255),
    role VARCHAR(50),
    branchId INT,
    email VARCHAR(255),
    phone VARCHAR(20),
    isAdmin BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE CommissionSettings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    commissionId VARCHAR(255) UNIQUE,
    name VARCHAR(255) NOT NULL,
    scope ENUM('Toàn hệ thống', 'Chi nhánh'),
    branchId INT,
    status ENUM('Áp dụng', 'Ngừng áp dụng') DEFAULT 'Áp dụng',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE CommissionDetails (
    id INT AUTO_INCREMENT PRIMARY KEY,
    commissionSettingId INT,
    productId INT,
    rate DECIMAL(5, 2)
);

CREATE TABLE Employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employeeId VARCHAR(255) UNIQUE,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    address TEXT,
    branchSalaryId INT,
    branchWorkId INT,
    startDate DATE,
    positionId INT,
    departmentId INT,
    userAccountId INT,
    idCard VARCHAR(20),
    dob DATE,
    gender ENUM('Nam', 'Nữ', 'Khác'),
    salaryType ENUM('Theo ca', 'Theo giờ', 'Theo ngày công', 'Cố định'),
    shiftRate DECIMAL(10, 2),
    hourlyRate DECIMAL(10, 2),
    dailyRate DECIMAL(10, 2),
    fixedRate DECIMAL(10, 2),
    commission DECIMAL(5, 2),
    commissionTableId INT,
    status ENUM('Đang làm việc', 'Đã nghỉ') DEFAULT 'Đang làm việc',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE EmployeeBonuses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employeeId INT,
    type ENUM('Doanh thu cá nhân', 'Lợi nhuận chi nhánh', 'Lợi nhuận gộp'),
    form ENUM('Tổng doanh thu', 'Bậc thang doanh thu', 'Vượt doanh thu'),
    value DECIMAL(10, 2)
);

CREATE TABLE EmployeeAllowances (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employeeId INT,
    name VARCHAR(255),
    type ENUM('Theo ngày', 'Hàng tháng cố định', 'Hàng tháng tính trên ngày công'),
    value DECIMAL(10, 2),
    valueType ENUM('VND', '%')
);

CREATE TABLE EmployeeDeductions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employeeId INT,
    name VARCHAR(255),
    `type` ENUM('Đi muộn', 'Về sớm', 'Cố định'),
    `condition` ENUM('Theo số lần', 'Theo phút'),
    `value` DECIMAL(10, 2)
);

CREATE TABLE Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    productId VARCHAR(255) UNIQUE,
    barcode VARCHAR(50),
    name VARCHAR(255) NOT NULL,
    categoryId INT,
    brandId INT,
    price DECIMAL(10, 2) NOT NULL,
    cost DECIMAL(10, 2),
    stock INT DEFAULT 0,
    location VARCHAR(255),
    minStock INT,
    maxStock INT,
    status ENUM('Cho phép kinh doanh', 'Ngừng kinh doanh') DEFAULT 'Cho phép kinh doanh',
    image VARCHAR(255),
    weight DECIMAL(10, 2),
    unit VARCHAR(50),
    description TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Attendances (
    id INT AUTO_INCREMENT PRIMARY KEY,
    attendanceId VARCHAR(255) UNIQUE,
    employeeId INT,
    date DATE,
    checkIn DATETIME,
    checkOut DATETIME,
    status ENUM('Đúng giờ', 'Đi muộn', 'Về sớm', 'Chưa chấm công', 'Nghỉ làm'),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE BlogCategories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    storeId INT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    parentCategoryId INT,
    `order` INT DEFAULT 0,
    status ENUM('Đang hoạt động', 'Ngừng hoạt động') DEFAULT 'Đang hoạt động',
    metaTitle VARCHAR(255),
    metaDescription TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE BlogPosts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    storeId INT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    categoryId INT,
    thumbnail VARCHAR(255),
    content TEXT,
    excerpt TEXT,
    authorId INT,
    status ENUM('Bản nháp', 'Đã xuất bản', 'Đã lưu trữ') DEFAULT 'Bản nháp',
    publishedAt DATETIME,
    views INT DEFAULT 0,
    likes INT DEFAULT 0,
    metaTitle VARCHAR(255),
    metaDescription TEXT,
    ogImage VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE BlogPostTags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    blogPostId INT,
    tag VARCHAR(50)
);

CREATE TABLE BlogPostComments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    blogPostId INT,
    userId INT,
    content TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE CarrierGroups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    groupId VARCHAR(255) UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Carriers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    carrierId VARCHAR(255) UNIQUE,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    address TEXT,
    groupId INT,
    totalOrders INT DEFAULT 0,
    totalFees DECIMAL(10, 2) DEFAULT 0,
    status ENUM('Đang hoạt động', 'Ngừng hoạt động') DEFAULT 'Đang hoạt động',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE CashBooks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cashBookId VARCHAR(255) UNIQUE,
    storeId INT,
    type ENUM('Thu', 'Chi') NOT NULL,
    category ENUM('Thu từ bán hàng', 'Thu từ khác', 'Chi mua hàng', 'Chi lương', 'Chi vận chuyển', 'Chi marketing', 'Chi khác') NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    paymentMethod ENUM('Tiền mặt', 'Chuyển khoản', 'Thẻ tín dụng', 'Ví điện tử') NOT NULL,
    reference ENUM('Đơn hàng', 'Hóa đơn', 'Phiếu nhập', 'Phiếu xuất', 'Khác') NOT NULL,
    referenceId INT,
    description TEXT,
    date DATE NOT NULL,
    employeeId INT,
    status ENUM('Đã xác nhận', 'Chờ xác nhận', 'Đã hủy') DEFAULT 'Chờ xác nhận',
    notes TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE CashBookAttachments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cashBookId INT,
    attachment VARCHAR(255)
);

CREATE TABLE Destructions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    destructionId VARCHAR(255) UNIQUE,
    destructionCode VARCHAR(255),
    totalValue DECIMAL(10, 2),
    status ENUM('Phiếu tạm thời', 'Hoàn thành', 'Đã hủy') DEFAULT 'Phiếu tạm thời',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE DestructionProducts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    destructionId INT,
    productId INT,
    quantity INT
);

CREATE TABLE Holidays (
    id INT AUTO_INCREMENT PRIMARY KEY,
    storeId INT,
    name VARCHAR(255) NOT NULL,
    type ENUM('Ngày lễ', 'Ngày đặc biệt', 'Sự kiện của công ty') NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    duration INT,
    description TEXT,
    isRecurring BOOLEAN DEFAULT FALSE,
    recurringFrequency ENUM('Hàng năm', 'Hàng tháng', 'Hàng tuần'),
    recurringInterval INT,
    recurringEndAfter DATE,
    status ENUM('Đang hoạt động', 'Ngừng hoạt động') DEFAULT 'Đang hoạt động',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE InventoryChecks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    checkId VARCHAR(255) UNIQUE,
    storeId INT,
    warehouseId INT,
    checkDate DATE NOT NULL,
    type ENUM('Định kỳ', 'Đột xuất', 'Theo yêu cầu') NOT NULL,
    status ENUM('Draft', 'In Progress', 'Completed', 'Cancelled') DEFAULT 'Draft',
    totalItems INT DEFAULT 0,
    totalValue DECIMAL(10, 2) DEFAULT 0,
    totalDifference DECIMAL(10, 2) DEFAULT 0,
    checkedById INT,
    verifiedById INT,
    notes TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE InventoryCheckItems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    inventoryCheckId INT,
    productId INT,
    systemQuantity INT NOT NULL,
    actualQuantity INT NOT NULL,
    difference INT,
    unitPrice DECIMAL(10, 2),
    totalValue DECIMAL(10, 2),
    notes TEXT
);

CREATE TABLE InventoryCheckAttachments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    inventoryCheckId INT,
    attachment VARCHAR(255)
);

CREATE TABLE Orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orderId VARCHAR(255) UNIQUE,
    orderCode VARCHAR(255) UNIQUE,
    customerId INT,
    totalAmount DECIMAL(10, 2),
    discount DECIMAL(10, 2) DEFAULT 0,
    paymentMethod ENUM('Tiền mặt', 'Chuyển khoản', 'Thẻ', 'Ví'),
    status ENUM('Phiếu tạm thời', 'Đã xác nhận', 'Đang giao hàng', 'Hoàn thành', 'Đã hủy') DEFAULT 'Phiếu tạm thời',
    channelId INT,
    carrierId INT,
    deliveryDate DATE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE OrderProducts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orderId INT,
    productId INT,
    quantity INT,
    price DECIMAL(10, 2),
    discount DECIMAL(10, 2) DEFAULT 0
);

CREATE TABLE Invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    invoiceId VARCHAR(255) UNIQUE,
    storeId INT,
    orderId INT,
    customerId INT,
    invoiceNumber VARCHAR(255) NOT NULL,
    invoiceDate DATE NOT NULL,
    dueDate DATE,
    subtotal DECIMAL(10, 2) NOT NULL,
    tax DECIMAL(10, 2) DEFAULT 0,
    shipping DECIMAL(10, 2) DEFAULT 0,
    total DECIMAL(10, 2) NOT NULL,
    paymentMethod ENUM('Tiền mặt', 'Chuyển khoản', 'Thẻ tín dụng', 'Ví điện tử') NOT NULL,
    paymentStatus ENUM('Chưa thanh toán', 'Đã thanh toán một phần', 'Đã thanh toán', 'Đã hủy') DEFAULT 'Chưa thanh toán',
    notes TEXT,
    status ENUM('Draft', 'Issued', 'Cancelled', 'Void') DEFAULT 'Draft',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE InvoiceItems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    invoiceId INT,
    productId INT,
    quantity INT NOT NULL,
    unitPrice DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(10, 2) DEFAULT 0,
    total DECIMAL(10, 2) NOT NULL
);

CREATE TABLE LiveStreams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    storeId INT,
    channelId INT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    thumbnail VARCHAR(255),
    scheduledStartTime DATETIME NOT NULL,
    actualStartTime DATETIME,
    endTime DATETIME,
    duration INT,
    status ENUM('Đã lên lịch', 'Đang phát', 'Đã kết thúc', 'Đã hủy') DEFAULT 'Đã lên lịch',
    viewers INT DEFAULT 0,
    likes INT DEFAULT 0,
    comments INT DEFAULT 0,
    shares INT DEFAULT 0,
    peakViewers INT DEFAULT 0,
    orders INT DEFAULT 0,
    totalRevenue DECIMAL(10, 2) DEFAULT 0,
    averageOrderValue DECIMAL(10, 2) DEFAULT 0,
    recordingUrl VARCHAR(255),
    recordingDuration INT,
    recordingSize INT,
    recordingFormat VARCHAR(50),
    viewerRetention DECIMAL(5, 2),
    engagementRate DECIMAL(5, 2),
    conversionRate DECIMAL(5, 2),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE LiveStreamProducts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    liveStreamId INT,
    productId INT,
    name VARCHAR(255),
    price DECIMAL(10, 2),
    discount DECIMAL(10, 2),
    stock INT,
    `order` INT
);

CREATE TABLE LiveStreamPromotions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    liveStreamId INT,
    type VARCHAR(50),
    value DECIMAL(10, 2),
    description TEXT,
    startTime DATETIME,
    endTime DATETIME
);

CREATE TABLE LiveStreamComments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    liveStreamId INT,
    userId VARCHAR(255),
    userName VARCHAR(255),
    content TEXT,
    timestamp DATETIME,
    isPinned BOOLEAN DEFAULT FALSE
);

CREATE TABLE LiveStreamTopProducts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    liveStreamId INT,
    productId INT,
    sales INT,
    revenue DECIMAL(10, 2)
);

CREATE TABLE LoyaltyPrograms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    storeId INT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('Đang hoạt động', 'Ngừng hoạt động') DEFAULT 'Đang hoạt động',
    earnRate DECIMAL(5, 2),
    minPoints INT,
    pointValue DECIMAL(10, 2),
    expiryDays INT,
    totalMembers INT DEFAULT 0,
    totalPointsIssued INT DEFAULT 0,
    totalPointsRedeemed INT DEFAULT 0,
    totalRewardsRedeemed INT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE LoyaltyProgramTiers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    loyaltyProgramId INT,
    name VARCHAR(255) NOT NULL,
    minPoints INT NOT NULL,
    benefitType ENUM('Giảm giá', 'Miễn phí vận chuyển', 'Quà tặng', 'Quyền truy cập đặc biệt'),
    benefitValue DECIMAL(10, 2),
    benefitDescription TEXT
);

CREATE TABLE LoyaltyProgramRewards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    loyaltyProgramId INT,
    name VARCHAR(255) NOT NULL,
    points INT NOT NULL,
    description TEXT,
    image VARCHAR(255),
    stock INT,
    status ENUM('Có sẵn', 'Hết hàng', 'Không hoạt động') DEFAULT 'Có sẵn'
);

CREATE TABLE CustomerLoyaltyPoints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    storeId INT,
    customerId INT,
    programId INT,
    currentPoints INT DEFAULT 0,
    totalPointsEarned INT DEFAULT 0,
    totalPointsRedeemed INT DEFAULT 0,
    tier VARCHAR(50),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE PointsHistory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customerLoyaltyPointId INT,
    type ENUM('Kiếm tiền', 'Quy đổi', 'Hết hạn', 'Điều chỉnh') NOT NULL,
    points INT NOT NULL,
    orderId INT,
    rewardId INT,
    description TEXT,
    expiryDate DATE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE MarketingCampaigns (
    id INT AUTO_INCREMENT PRIMARY KEY,
    storeId INT,
    name VARCHAR(255) NOT NULL,
    type ENUM('Giảm giá', 'Giao hàng miễn phí', 'Quà tặng', 'Gói', 'Điểm khách hàng thân thiết') NOT NULL,
    description TEXT,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    status ENUM('Bản nháp', 'Đang hoạt động', 'Đã tạm dừng', 'Đã kết thúc', 'Đã hủy') DEFAULT 'Bản nháp',
    minOrderValue DECIMAL(10, 2),
    maxDiscount DECIMAL(10, 2),
    usageLimit INT,
    usagePerCustomer INT,
    discountType ENUM('Tỷ lệ phần trăm', 'Số tiền cố định'),
    discountValue DECIMAL(10, 2),
    freeShipping BOOLEAN,
    giftProductId INT,
    loyaltyPoints INT,
    totalUsage INT DEFAULT 0,
    totalRevenue DECIMAL(10, 2) DEFAULT 0,
    totalCustomers INT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE CampaignApplicableProducts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    campaignId INT,
    productId INT
);

CREATE TABLE CampaignApplicableCategories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    campaignId INT,
    categoryId INT
);

CREATE TABLE CampaignApplicableCustomerGroups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    campaignId INT,
    customerGroupId INT
);

CREATE TABLE CampaignBundleProducts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    campaignId INT,
    productId INT,
    quantity INT
);

CREATE TABLE MarketplaceListings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    storeId INT,
    productId INT,
    marketplace ENUM('Shopee', 'Lazada', 'Tiki', 'Sendo', 'ZaloShop', 'FacebookShop') NOT NULL,
    listingId VARCHAR(255),
    listingUrl VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    originalPrice DECIMAL(10, 2),
    stock INT NOT NULL,
    sku VARCHAR(50),
    category VARCHAR(255),
    subCategory VARCHAR(255),
    shippingMethods JSON,
    shippingWeight DECIMAL(10, 2),
    shippingLength DECIMAL(10, 2),
    shippingWidth DECIMAL(10, 2),
    shippingHeight DECIMAL(10, 2),
    totalSales INT DEFAULT 0,
    totalRevenue DECIMAL(10, 2) DEFAULT 0,
    rating DECIMAL(3, 2) DEFAULT 0,
    reviews INT DEFAULT 0,
    status ENUM('Đang hoạt động', 'Tạm ngưng', 'Đã xóa', 'Lỗi') DEFAULT 'Đang hoạt động',
    lastSync DATETIME,
    syncStatus ENUM('Thành công', 'Thất bại', 'Đang xử lý') DEFAULT 'Thành công',
    syncError TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE MarketplaceListingImages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marketplaceListingId INT,
    image VARCHAR(255)
);

CREATE TABLE MarketplaceListingAttributes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marketplaceListingId INT,
    name VARCHAR(255),
    value VARCHAR(255)
);

CREATE TABLE Payrolls (
    id INT AUTO_INCREMENT PRIMARY KEY,
    payrollId VARCHAR(255) UNIQUE,
    employeeId INT,
    month INT,
    year INT,
    basicSalary DECIMAL(10, 2),
    bonus DECIMAL(10, 2) DEFAULT 0,
    commission DECIMAL(10, 2) DEFAULT 0,
    allowance DECIMAL(10, 2) DEFAULT 0,
    deduction DECIMAL(10, 2) DEFAULT 0,
    total DECIMAL(10, 2),
    paid DECIMAL(10, 2) DEFAULT 0,
    status ENUM('Đang tạo', 'Tạm tính', 'Đã chốt lương', 'Đã hủy') DEFAULT 'Đang tạo',
    branchId INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE PriceLists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    priceListId VARCHAR(255) UNIQUE,
    storeId INT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    type ENUM('Bán lẻ', 'Bán buôn', 'Đại lý', 'Khuyến mãi') NOT NULL,
    status ENUM('Đang hoạt động', 'Ngừng hoạt động') DEFAULT 'Đang hoạt động',
    validFrom DATE,
    validTo DATE,
    minOrderValue DECIMAL(10, 2),
    maxOrderValue DECIMAL(10, 2),
    paymentMethods JSON,
    locations JSON,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE PriceListProducts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    priceListId INT,
    productId INT,
    price DECIMAL(10, 2) NOT NULL,
    minQuantity INT DEFAULT 1,
    maxQuantity INT,
    discount DECIMAL(10, 2) DEFAULT 0,
    discountType ENUM('Phần trăm', 'Số tiền') DEFAULT 'Phần trăm'
);

CREATE TABLE PriceListCustomerGroups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    priceListId INT,
    customerGroupId INT
);

CREATE TABLE PurchaseHistory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    purchaseId VARCHAR(255) UNIQUE,
    storeId INT,
    packageId INT,
    purchaseDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    duration INT,
    totalAmount DECIMAL(10, 2),
    status ENUM('Hoàn thành', 'Đang xử lý', 'Hủy') DEFAULT 'Hoàn thành',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE PurchaseOrders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    purchaseOrderId VARCHAR(255) UNIQUE,
    purchaseOrderCode VARCHAR(255),
    supplierId INT,
    totalAmount DECIMAL(10, 2),
    status ENUM('Phiếu tạm thời', 'Đã nhập hàng', 'Đã hủy') DEFAULT 'Phiếu tạm thời',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE PurchaseOrderProducts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    purchaseOrderId INT,
    productId INT,
    quantity INT,
    price DECIMAL(10, 2)
);

CREATE TABLE ReturnPurchases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    returnPurchaseId VARCHAR(255) UNIQUE,
    returnPurchaseCode VARCHAR(255),
    purchaseOrderId INT,
    reason TEXT,
    totalRefund DECIMAL(10, 2),
    status ENUM('Phiếu tạm thời', 'Đã trả hàng', 'Đã hủy') DEFAULT 'Phiếu tạm thời',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE ReturnPurchaseProducts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    returnPurchaseId INT,
    productId INT,
    quantity INT
);

CREATE TABLE Returns (
    id INT AUTO_INCREMENT PRIMARY KEY,
    returnId VARCHAR(255) UNIQUE,
    returnCode VARCHAR(255),
    orderId INT,
    reason TEXT,
    totalRefund DECIMAL(10, 2),
    status ENUM('Đã trả', 'Đã hủy') DEFAULT 'Đã trả',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE ReturnProducts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    returnId INT,
    productId INT,
    quantity INT
);

CREATE TABLE SalesChannels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    storeId INT,
    name VARCHAR(255) NOT NULL,
    type ENUM('Trực tiếp', 'Shopee', 'Tiki', 'Lazada', 'Sendo', 'Facebook', 'Instagram') NOT NULL,
    description TEXT,
    status ENUM('Đang hoạt động', 'Ngừng hoạt động') DEFAULT 'Đang hoạt động',
    syncProducts BOOLEAN DEFAULT FALSE,
    syncPrices BOOLEAN DEFAULT FALSE,
    syncStock BOOLEAN DEFAULT FALSE,
    shopeeShopId VARCHAR(255),
    shopeeAccessToken TEXT,
    shopeeRefreshToken TEXT,
    shopeeTokenExpiry DATETIME,
    tikiSellerId VARCHAR(255),
    tikiAccessToken TEXT,
    tikiRefreshToken TEXT,
    tikiTokenExpiry DATETIME,
    lazadaSellerId VARCHAR(255),
    lazadaAccessToken TEXT,
    lazadaRefreshToken TEXT,
    lazadaTokenExpiry DATETIME,
    sendoSellerId VARCHAR(255),
    sendoAccessToken TEXT,
    sendoRefreshToken TEXT,
    sendoTokenExpiry DATETIME,
    facebookPageId VARCHAR(255),
    facebookAccessToken TEXT,
    facebookTokenExpiry DATETIME,
    instagramBusinessAccountId VARCHAR(255),
    instagramAccessToken TEXT,
    instagramTokenExpiry DATETIME,
    totalOrders INT DEFAULT 0,
    totalRevenue DECIMAL(10, 2) DEFAULT 0,
    totalProducts INT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Shipments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    shipmentId VARCHAR(255) UNIQUE,
    storeId INT,
    orderId INT,
    customerId INT,
    shippingMethod ENUM('Giao hàng nhanh', 'Giao hàng tiết kiệm', 'Viettel Post', 'Grab Express', 'Tự giao') NOT NULL,
    trackingNumber VARCHAR(255),
    shippingFee DECIMAL(10, 2) NOT NULL,
    estimatedDeliveryDate DATE,
    actualDeliveryDate DATE,
    shippingFullName VARCHAR(255) NOT NULL,
    shippingPhone VARCHAR(20) NOT NULL,
    shippingAddress TEXT NOT NULL,
    shippingWard VARCHAR(255),
    shippingDistrict VARCHAR(255),
    shippingCity VARCHAR(255),
    shippingProvince VARCHAR(255),
    shippingCountry VARCHAR(255) DEFAULT 'Việt Nam',
    status ENUM('Chờ xử lý', 'Đã nhận đơn', 'Đang vận chuyển', 'Đã giao hàng', 'Giao hàng thất bại', 'Đã hủy') DEFAULT 'Chờ xử lý',
    notes TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE TrackingHistory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    shipmentId INT,
    status VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    note TEXT
);

CREATE TABLE SocialMediaConversations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    storeId INT,
    channelId INT,
    platformConversationId VARCHAR(255),
    customerPlatformUserId VARCHAR(255),
    customerName VARCHAR(255),
    customerAvatar VARCHAR(255),
    customerPhone VARCHAR(20),
    customerEmail VARCHAR(255),
    type ENUM('Tin nhắn trực tiếp', 'Bình luận', 'Đánh giá', 'Khiếu nại') NOT NULL,
    status ENUM('Mới', 'Đang xử lý', 'Đã hoàn thành', 'Đã đóng') DEFAULT 'Mới',
    priority ENUM('Thấp', 'Trung bình', 'Cao', 'Khẩn cấp') DEFAULT 'Trung bình',
    assignedToId INT,
    responseTime INT,
    resolutionTime INT,
    customerSatisfaction INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE ConversationMessages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    conversationId INT,
    platformMessageId VARCHAR(255),
    sender VARCHAR(255),
    content TEXT,
    type VARCHAR(50),
    createdAt DATETIME
);

CREATE TABLE ConversationMessageAttachments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    messageId INT,
    attachment VARCHAR(255)
);

CREATE TABLE ConversationTags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    conversationId INT,
    tag VARCHAR(50)
);

CREATE TABLE ConversationNotes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    conversationId INT,
    note TEXT
);

CREATE TABLE ConversationRelatedOrders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    conversationId INT,
    orderId INT,
    orderCode VARCHAR(255)
);

CREATE TABLE ConversationRelatedProducts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    conversationId INT,
    productId INT,
    name VARCHAR(255)
);

CREATE TABLE SocialMediaPosts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    storeId INT,
    channelId INT,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    isScheduled BOOLEAN DEFAULT FALSE,
    scheduledTime DATETIME,
    timezone VARCHAR(50),
    likes INT DEFAULT 0,
    comments INT DEFAULT 0,
    shares INT DEFAULT 0,
    views INT DEFAULT 0,
    status ENUM('Bản nháp', 'Đã lên lịch', 'Đã đăng', 'Đã hủy', 'Lỗi') DEFAULT 'Bản nháp',
    postedById INT,
    postedAt DATETIME,
    platformPostId VARCHAR(255),
    platformPostUrl VARCHAR(255),
    platform VARCHAR(50),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE PostMedia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    postId INT,
    type ENUM('image', 'video', 'link'),
    url VARCHAR(255),
    caption TEXT
);

CREATE TABLE PostProducts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    postId INT,
    productId INT,
    name VARCHAR(255),
    price DECIMAL(10, 2),
    discount DECIMAL(10, 2)
);

CREATE TABLE PostHashtags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    postId INT,
    hashtag VARCHAR(50)
);

CREATE TABLE PostMentions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    postId INT,
    mention VARCHAR(50)
);

CREATE TABLE SupplierGroups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    groupId VARCHAR(255) UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Suppliers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    supplierId VARCHAR(255) UNIQUE,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    address TEXT,
    groupId INT,
    debt DECIMAL(10, 2) DEFAULT 0,
    totalPurchases DECIMAL(10, 2) DEFAULT 0,
    status ENUM('Đang hoạt động', 'Ngừng hoạt động') DEFAULT 'Đang hoạt động',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    transactionId VARCHAR(255) UNIQUE,
    storeId INT,
    type ENUM('Nạp tiền', 'Chi tiêu'),
    amount DECIMAL(10, 2) NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    balanceBefore DECIMAL(10, 2),
    balanceAfter DECIMAL(10, 2),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE WebsiteSettings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    storeId INT,
    siteName VARCHAR(255) NOT NULL,
    logo VARCHAR(255),
    favicon VARCHAR(255),
    description TEXT,
    phone VARCHAR(20),
    email VARCHAR(255),
    address TEXT,
    workingHours VARCHAR(255),
    facebook VARCHAR(255),
    instagram VARCHAR(255),
    youtube VARCHAR(255),
    tiktok VARCHAR(255),
    zalo VARCHAR(255),
    metaTitle VARCHAR(255),
    metaDescription TEXT,
    ogImage VARCHAR(255),
    robots VARCHAR(50),
    sitemap BOOLEAN DEFAULT TRUE,
    primaryColor VARCHAR(20),
    secondaryColor VARCHAR(20),
    fontFamily VARCHAR(50),
    customCSS TEXT,
    `ssl` BOOLEAN DEFAULT TRUE,
    maintenanceMode BOOLEAN DEFAULT FALSE,
    allowedIPs JSON,
    googleAnalytics VARCHAR(255),
    facebookPixel VARCHAR(255),
    chatWidget BOOLEAN DEFAULT TRUE,
    status ENUM('Đang hoạt động', 'Bảo trì', 'Tạm ngưng') DEFAULT 'Đang hoạt động',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE WebsiteKeywords (
    id INT AUTO_INCREMENT PRIMARY KEY,
    websiteSettingId INT,
    keyword VARCHAR(255)
);

CREATE TABLE WorkSchedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    storeId INT,
    employeeId INT,
    mondayIsWorking BOOLEAN DEFAULT TRUE,
    mondayStartTime VARCHAR(10),
    mondayEndTime VARCHAR(10),
    mondayBreakTime VARCHAR(10),
    tuesdayIsWorking BOOLEAN DEFAULT TRUE,
    tuesdayStartTime VARCHAR(10),
    tuesdayEndTime VARCHAR(10),
    tuesdayBreakTime VARCHAR(10),
    wednesdayIsWorking BOOLEAN DEFAULT TRUE,
    wednesdayStartTime VARCHAR(10),
    wednesdayEndTime VARCHAR(10),
    wednesdayBreakTime VARCHAR(10),
    thursdayIsWorking BOOLEAN DEFAULT TRUE,
    thursdayStartTime VARCHAR(10),
    thursdayEndTime VARCHAR(10),
    thursdayBreakTime VARCHAR(10),
    fridayIsWorking BOOLEAN DEFAULT TRUE,
    fridayStartTime VARCHAR(10),
    fridayEndTime VARCHAR(10),
    fridayBreakTime VARCHAR(10),
    saturdayIsWorking BOOLEAN DEFAULT FALSE,
    saturdayStartTime VARCHAR(10),
    saturdayEndTime VARCHAR(10),
    saturdayBreakTime VARCHAR(10),
    sundayIsWorking BOOLEAN DEFAULT FALSE,
    sundayStartTime VARCHAR(10),
    sundayEndTime VARCHAR(10),
    sundayBreakTime VARCHAR(10),
    overtimeAllowed BOOLEAN DEFAULT TRUE,
    overtimeMaxHoursPerWeek INT DEFAULT 40,
    overtimeRate DECIMAL(5, 2) DEFAULT 1.5,
    annualLeave INT DEFAULT 12,
    sickLeave INT DEFAULT 5,
    maternityLeave INT DEFAULT 180,
    status ENUM('Đang hoạt động', 'Tạm ngưng', 'Đã hủy') DEFAULT 'Đang hoạt động',
    notes TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE SpecialSchedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    workScheduleId INT,
    date DATE,
    isWorking BOOLEAN,
    startTime VARCHAR(10),
    endTime VARCHAR(10),
    breakTime VARCHAR(10),
    reason TEXT
);

-- Stores
ALTER TABLE Stores ADD FOREIGN KEY (servicePackageId) REFERENCES ServicePackages(id);

-- Categories (self-referential)
ALTER TABLE Categories ADD FOREIGN KEY (parentCategoryId) REFERENCES Categories(id);

-- Customers
ALTER TABLE Customers ADD FOREIGN KEY (groupId) REFERENCES CustomerGroups(id);

-- Users
ALTER TABLE Users ADD FOREIGN KEY (branchId) REFERENCES Branches(id);

-- CommissionSettings
ALTER TABLE CommissionSettings ADD FOREIGN KEY (branchId) REFERENCES Branches(id);
ALTER TABLE CommissionDetails ADD FOREIGN KEY (commissionSettingId) REFERENCES CommissionSettings(id);
ALTER TABLE CommissionDetails ADD FOREIGN KEY (productId) REFERENCES Products(id);

-- Employees
ALTER TABLE Employees ADD FOREIGN KEY (branchSalaryId) REFERENCES Branches(id);
ALTER TABLE Employees ADD FOREIGN KEY (branchWorkId) REFERENCES Branches(id);
ALTER TABLE Employees ADD FOREIGN KEY (positionId) REFERENCES Positions(id);
ALTER TABLE Employees ADD FOREIGN KEY (departmentId) REFERENCES Departments(id);
ALTER TABLE Employees ADD FOREIGN KEY (userAccountId) REFERENCES Users(id);
ALTER TABLE Employees ADD FOREIGN KEY (commissionTableId) REFERENCES CommissionSettings(id);
ALTER TABLE EmployeeBonuses ADD FOREIGN KEY (employeeId) REFERENCES Employees(id);
ALTER TABLE EmployeeAllowances ADD FOREIGN KEY (employeeId) REFERENCES Employees(id);
ALTER TABLE EmployeeDeductions ADD FOREIGN KEY (employeeId) REFERENCES Employees(id);

-- Products
ALTER TABLE Products ADD FOREIGN KEY (categoryId) REFERENCES Categories(id);
ALTER TABLE Products ADD FOREIGN KEY (brandId) REFERENCES Brands(id);

-- Attendances
ALTER TABLE Attendances ADD FOREIGN KEY (employeeId) REFERENCES Employees(id);

-- BlogCategories (self-referential)
ALTER TABLE BlogCategories ADD FOREIGN KEY (storeId) REFERENCES Stores(id);
ALTER TABLE BlogCategories ADD FOREIGN KEY (parentCategoryId) REFERENCES BlogCategories(id);

-- BlogPosts
ALTER TABLE BlogPosts ADD FOREIGN KEY (storeId) REFERENCES Stores(id);
ALTER TABLE BlogPosts ADD FOREIGN KEY (categoryId) REFERENCES BlogCategories(id);
ALTER TABLE BlogPosts ADD FOREIGN KEY (authorId) REFERENCES Employees(id);
ALTER TABLE BlogPostTags ADD FOREIGN KEY (blogPostId) REFERENCES BlogPosts(id);
ALTER TABLE BlogPostComments ADD FOREIGN KEY (blogPostId) REFERENCES BlogPosts(id);
ALTER TABLE BlogPostComments ADD FOREIGN KEY (userId) REFERENCES Users(id);

-- Carriers
ALTER TABLE Carriers ADD FOREIGN KEY (groupId) REFERENCES CarrierGroups(id);

-- CashBooks
ALTER TABLE CashBooks ADD FOREIGN KEY (storeId) REFERENCES Stores(id);
ALTER TABLE CashBooks ADD FOREIGN KEY (employeeId) REFERENCES Employees(id);
ALTER TABLE CashBookAttachments ADD FOREIGN KEY (cashBookId) REFERENCES CashBooks(id);

-- Destructions
ALTER TABLE DestructionProducts ADD FOREIGN KEY (destructionId) REFERENCES Destructions(id);
ALTER TABLE DestructionProducts ADD FOREIGN KEY (productId) REFERENCES Products(id);

-- Holidays
ALTER TABLE Holidays ADD FOREIGN KEY (storeId) REFERENCES Stores(id);

-- InventoryChecks
ALTER TABLE InventoryChecks ADD FOREIGN KEY (storeId) REFERENCES Stores(id);
ALTER TABLE InventoryChecks ADD FOREIGN KEY (warehouseId) REFERENCES Stores(id); -- Giả định là Stores, có thể cần sửa nếu có bảng Warehouses
ALTER TABLE InventoryChecks ADD FOREIGN KEY (checkedById) REFERENCES Employees(id);
ALTER TABLE InventoryChecks ADD FOREIGN KEY (verifiedById) REFERENCES Employees(id);
ALTER TABLE InventoryCheckItems ADD FOREIGN KEY (inventoryCheckId) REFERENCES InventoryChecks(id);
ALTER TABLE InventoryCheckItems ADD FOREIGN KEY (productId) REFERENCES Products(id);
ALTER TABLE InventoryCheckAttachments ADD FOREIGN KEY (inventoryCheckId) REFERENCES InventoryChecks(id);

-- Orders
ALTER TABLE Orders ADD FOREIGN KEY (customerId) REFERENCES Customers(id);
ALTER TABLE Orders ADD FOREIGN KEY (channelId) REFERENCES SalesChannels(id);
ALTER TABLE Orders ADD FOREIGN KEY (carrierId) REFERENCES Carriers(id);
ALTER TABLE OrderProducts ADD FOREIGN KEY (orderId) REFERENCES Orders(id);
ALTER TABLE OrderProducts ADD FOREIGN KEY (productId) REFERENCES Products(id);

-- Invoices
ALTER TABLE Invoices ADD FOREIGN KEY (storeId) REFERENCES Stores(id);
ALTER TABLE Invoices ADD FOREIGN KEY (orderId) REFERENCES Orders(id);
ALTER TABLE Invoices ADD FOREIGN KEY (customerId) REFERENCES Customers(id);
ALTER TABLE InvoiceItems ADD FOREIGN KEY (invoiceId) REFERENCES Invoices(id);
ALTER TABLE InvoiceItems ADD FOREIGN KEY (productId) REFERENCES Products(id);

-- LiveStreams
ALTER TABLE LiveStreams ADD FOREIGN KEY (storeId) REFERENCES Stores(id);
ALTER TABLE LiveStreams ADD FOREIGN KEY (channelId) REFERENCES SalesChannels(id);
ALTER TABLE LiveStreamProducts ADD FOREIGN KEY (liveStreamId) REFERENCES LiveStreams(id);
ALTER TABLE LiveStreamProducts ADD FOREIGN KEY (productId) REFERENCES Products(id);
ALTER TABLE LiveStreamPromotions ADD FOREIGN KEY (liveStreamId) REFERENCES LiveStreams(id);
ALTER TABLE LiveStreamComments ADD FOREIGN KEY (liveStreamId) REFERENCES LiveStreams(id);
ALTER TABLE LiveStreamTopProducts ADD FOREIGN KEY (liveStreamId) REFERENCES LiveStreams(id);
ALTER TABLE LiveStreamTopProducts ADD FOREIGN KEY (productId) REFERENCES Products(id);

-- LoyaltyPrograms
ALTER TABLE LoyaltyPrograms ADD FOREIGN KEY (storeId) REFERENCES Stores(id);
ALTER TABLE LoyaltyProgramTiers ADD FOREIGN KEY (loyaltyProgramId) REFERENCES LoyaltyPrograms(id);
ALTER TABLE LoyaltyProgramRewards ADD FOREIGN KEY (loyaltyProgramId) REFERENCES LoyaltyPrograms(id);

-- CustomerLoyaltyPoints
ALTER TABLE CustomerLoyaltyPoints ADD FOREIGN KEY (storeId) REFERENCES Stores(id);
ALTER TABLE CustomerLoyaltyPoints ADD FOREIGN KEY (customerId) REFERENCES Customers(id);
ALTER TABLE CustomerLoyaltyPoints ADD FOREIGN KEY (programId) REFERENCES LoyaltyPrograms(id);
ALTER TABLE PointsHistory ADD FOREIGN KEY (customerLoyaltyPointId) REFERENCES CustomerLoyaltyPoints(id);
ALTER TABLE PointsHistory ADD FOREIGN KEY (orderId) REFERENCES Orders(id);
ALTER TABLE PointsHistory ADD FOREIGN KEY (rewardId) REFERENCES LoyaltyProgramRewards(id);

-- MarketingCampaigns
ALTER TABLE MarketingCampaigns ADD FOREIGN KEY (storeId) REFERENCES Stores(id);
ALTER TABLE MarketingCampaigns ADD FOREIGN KEY (giftProductId) REFERENCES Products(id);
ALTER TABLE CampaignApplicableProducts ADD FOREIGN KEY (campaignId) REFERENCES MarketingCampaigns(id);
ALTER TABLE CampaignApplicableProducts ADD FOREIGN KEY (productId) REFERENCES Products(id);
ALTER TABLE CampaignApplicableCategories ADD FOREIGN KEY (campaignId) REFERENCES MarketingCampaigns(id);
ALTER TABLE CampaignApplicableCategories ADD FOREIGN KEY (categoryId) REFERENCES Categories(id);
ALTER TABLE CampaignApplicableCustomerGroups ADD FOREIGN KEY (campaignId) REFERENCES MarketingCampaigns(id);
ALTER TABLE CampaignApplicableCustomerGroups ADD FOREIGN KEY (customerGroupId) REFERENCES CustomerGroups(id);
ALTER TABLE CampaignBundleProducts ADD FOREIGN KEY (campaignId) REFERENCES MarketingCampaigns(id);
ALTER TABLE CampaignBundleProducts ADD FOREIGN KEY (productId) REFERENCES Products(id);

-- MarketplaceListings
ALTER TABLE MarketplaceListings ADD FOREIGN KEY (storeId) REFERENCES Stores(id);
ALTER TABLE MarketplaceListings ADD FOREIGN KEY (productId) REFERENCES Products(id);
ALTER TABLE MarketplaceListingImages ADD FOREIGN KEY (marketplaceListingId) REFERENCES MarketplaceListings(id);
ALTER TABLE MarketplaceListingAttributes ADD FOREIGN KEY (marketplaceListingId) REFERENCES MarketplaceListings(id);

-- Payrolls
ALTER TABLE Payrolls ADD FOREIGN KEY (employeeId) REFERENCES Employees(id);
ALTER TABLE Payrolls ADD FOREIGN KEY (branchId) REFERENCES Branches(id);

-- PriceLists
ALTER TABLE PriceLists ADD FOREIGN KEY (storeId) REFERENCES Stores(id);
ALTER TABLE PriceListProducts ADD FOREIGN KEY (priceListId) REFERENCES PriceLists(id);
ALTER TABLE PriceListProducts ADD FOREIGN KEY (productId) REFERENCES Products(id);
ALTER TABLE PriceListCustomerGroups ADD FOREIGN KEY (priceListId) REFERENCES PriceLists(id);
ALTER TABLE PriceListCustomerGroups ADD FOREIGN KEY (customerGroupId) REFERENCES CustomerGroups(id);

-- PurchaseHistory
ALTER TABLE PurchaseHistory ADD FOREIGN KEY (storeId) REFERENCES Stores(id);
ALTER TABLE PurchaseHistory ADD FOREIGN KEY (packageId) REFERENCES ServicePackages(id);

-- PurchaseOrders
ALTER TABLE PurchaseOrders ADD FOREIGN KEY (supplierId) REFERENCES Suppliers(id);
ALTER TABLE PurchaseOrderProducts ADD FOREIGN KEY (purchaseOrderId) REFERENCES PurchaseOrders(id);
ALTER TABLE PurchaseOrderProducts ADD FOREIGN KEY (productId) REFERENCES Products(id);

-- ReturnPurchases
ALTER TABLE ReturnPurchases ADD FOREIGN KEY (purchaseOrderId) REFERENCES PurchaseOrders(id);
ALTER TABLE ReturnPurchaseProducts ADD FOREIGN KEY (returnPurchaseId) REFERENCES ReturnPurchases(id);
ALTER TABLE ReturnPurchaseProducts ADD FOREIGN KEY (productId) REFERENCES Products(id);

-- Returns
ALTER TABLE Returns ADD FOREIGN KEY (orderId) REFERENCES Orders(id);
ALTER TABLE ReturnProducts ADD FOREIGN KEY (returnId) REFERENCES Returns(id);
ALTER TABLE ReturnProducts ADD FOREIGN KEY (productId) REFERENCES Products(id);

-- SalesChannels
ALTER TABLE SalesChannels ADD FOREIGN KEY (storeId) REFERENCES Stores(id);

-- Shipments
ALTER TABLE Shipments ADD FOREIGN KEY (storeId) REFERENCES Stores(id);
ALTER TABLE Shipments ADD FOREIGN KEY (orderId) REFERENCES Orders(id);
ALTER TABLE Shipments ADD FOREIGN KEY (customerId) REFERENCES Customers(id);
ALTER TABLE TrackingHistory ADD FOREIGN KEY (shipmentId) REFERENCES Shipments(id);

-- SocialMediaConversations
ALTER TABLE SocialMediaConversations ADD FOREIGN KEY (storeId) REFERENCES Stores(id);
ALTER TABLE SocialMediaConversations ADD FOREIGN KEY (channelId) REFERENCES SalesChannels(id);
ALTER TABLE SocialMediaConversations ADD FOREIGN KEY (assignedToId) REFERENCES Employees(id);
ALTER TABLE ConversationMessages ADD FOREIGN KEY (conversationId) REFERENCES SocialMediaConversations(id);
ALTER TABLE ConversationMessageAttachments ADD FOREIGN KEY (messageId) REFERENCES ConversationMessages(id);
ALTER TABLE ConversationTags ADD FOREIGN KEY (conversationId) REFERENCES SocialMediaConversations(id);
ALTER TABLE ConversationNotes ADD FOREIGN KEY (conversationId) REFERENCES SocialMediaConversations(id);
ALTER TABLE ConversationRelatedOrders ADD FOREIGN KEY (conversationId) REFERENCES SocialMediaConversations(id);
ALTER TABLE ConversationRelatedOrders ADD FOREIGN KEY (orderId) REFERENCES Orders(id);
ALTER TABLE ConversationRelatedProducts ADD FOREIGN KEY (conversationId) REFERENCES SocialMediaConversations(id);
ALTER TABLE ConversationRelatedProducts ADD FOREIGN KEY (productId) REFERENCES Products(id);

-- SocialMediaPosts
ALTER TABLE SocialMediaPosts ADD FOREIGN KEY (storeId) REFERENCES Stores(id);
ALTER TABLE SocialMediaPosts ADD FOREIGN KEY (channelId) REFERENCES SalesChannels(id);
ALTER TABLE SocialMediaPosts ADD FOREIGN KEY (postedById) REFERENCES Employees(id);
ALTER TABLE PostMedia ADD FOREIGN KEY (postId) REFERENCES SocialMediaPosts(id);
ALTER TABLE PostProducts ADD FOREIGN KEY (postId) REFERENCES SocialMediaPosts(id);
ALTER TABLE PostProducts ADD FOREIGN KEY (productId) REFERENCES Products(id);
ALTER TABLE PostHashtags ADD FOREIGN KEY (postId) REFERENCES SocialMediaPosts(id);
ALTER TABLE PostMentions ADD FOREIGN KEY (postId) REFERENCES SocialMediaPosts(id);

-- Suppliers
ALTER TABLE Suppliers ADD FOREIGN KEY (groupId) REFERENCES SupplierGroups(id);

-- Transactions
ALTER TABLE Transactions ADD FOREIGN KEY (storeId) REFERENCES Stores(id);

-- WebsiteSettings
ALTER TABLE WebsiteSettings ADD FOREIGN KEY (storeId) REFERENCES Stores(id);
ALTER TABLE WebsiteKeywords ADD FOREIGN KEY (websiteSettingId) REFERENCES WebsiteSettings(id);

-- WorkSchedules
ALTER TABLE WorkSchedules ADD FOREIGN KEY (storeId) REFERENCES Stores(id);
ALTER TABLE WorkSchedules ADD FOREIGN KEY (employeeId) REFERENCES Employees(id);
ALTER TABLE SpecialSchedules ADD FOREIGN KEY (workScheduleId) REFERENCES WorkSchedules(id);