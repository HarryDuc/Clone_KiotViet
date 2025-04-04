import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BranchModule } from './modules/branch/branch.module';
import { UserModule } from './modules/auth/user.module'
import { BrandModule } from './modules/brand/brand.module';
import { CategoriesModule } from './modules/category/categories.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { CashBookModule } from './modules/cash-book/cash-book.module';
import { CarrierModule } from './modules/carrier/carrier.module';
import { OrderModule } from './modules/order/order.module';
import { CarrierGroupModule } from './modules/carrier-group/carrier-group.module';
import { CommissionSettingModule } from './modules/commission-setting/commission-setting.module';
import { CustomerModule } from './modules/customer/customer.module';
import { DepartmentModule } from './modules/department/department.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { HolidayModule } from './modules/holiday/holiday.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { PayrollModule } from './modules/payroll/payroll.module';
import { PositionModule } from './modules/position/position.module';
import { ProductModule } from './modules/product/product.module';
import { PurchaseOrderModule } from './modules/purchase-order/purchase-orders.module';
import { ReturnModule } from './modules/ruturn/return.module';
import { ShipmentModule } from './modules/shipment/shipment.module';
import { StoreModule } from './modules/store/store.module';
import { SupplierModule } from './modules/supplier/supplier.module';
import { SupplierGroupModule } from './modules/supplier-group/supplier-group.module';
import { ServicePackageModule } from './modules/service-package/service-package.module';
import { PurchaseHistoryModule } from './modules/purchase-history/purchase-history.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost:27017/kiotviet'),
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    BranchModule,
    UserModule,
    BrandModule,
    CategoriesModule,
    AttendanceModule,
    CashBookModule,
    CarrierModule,
    OrderModule,
    CarrierGroupModule,
    CommissionSettingModule,
    CustomerModule,
    DepartmentModule,
    EmployeeModule,
    HolidayModule,
    InvoiceModule,
    PayrollModule,
    PositionModule,
    ProductModule,
    PurchaseOrderModule,
    ReturnModule,
    ShipmentModule,
    StoreModule,
    SupplierModule,
    SupplierGroupModule,
    ServicePackageModule,
    PurchaseHistoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
