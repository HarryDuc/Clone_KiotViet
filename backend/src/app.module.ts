import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BranchModule } from './modules/modules/branch.module';
import { UserModule } from './modules/auth/user.module'
import { BrandModule } from './modules/modules/brand.module';
import { CategoriesModule } from './modules/modules/categories.module';
import { AttendanceModule } from './modules/modules/attendance.module';
import { CashBookModule } from './modules/modules/cash-book.module';
import { CarrierModule } from './modules/modules/carrier.module';
import { OrderModule } from './modules/modules/order.module';
import { CarrierGroupModule } from './modules/modules/carrier-group.module';
import { CommissionSettingModule } from './modules/modules/commission-setting.module';
import { CustomerModule } from './modules/modules/customer.module';
import { DepartmentModule } from './modules/modules/department.module';
import { EmployeeModule } from './modules/modules/employee.module';
import { HolidayModule } from './modules/modules/holiday.module';
import { InvoiceModule } from './modules/modules/invoice.module';
import { PayrollModule } from './modules/modules/payroll.module';
import { PositionModule } from './modules/modules/position.module';
import { ProductModule } from './modules/modules/product.module';
import { PurchaseOrderModule } from './modules/modules/purchase-orders.module';
import { ReturnModule } from './modules/modules/return.module';
import { ShipmentModule } from './modules/modules/shipment.module';
import { StoreModule } from './modules/modules/store.module';
import { SupplierModule } from './modules/modules/supplier.module';
import { SupplierGroupModule } from './modules/modules/supplier-group.module';
import { ServicePackageModule } from './modules/modules/service-package.module';
import { PurchaseHistoryModule } from './modules/modules/purchase-history.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/kiotviet'),
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
