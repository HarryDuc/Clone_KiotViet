import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BranchModule } from './modules/modules/branch.module';
import { UserModule } from './modules/auth/user.module'
import { BrandModule } from './modules/modules/brand.module';
import { BlogModule } from './modules/modules/blog.module';
import { CategoriesModule } from './modules/modules/categories.module';
import { AttendanceModule } from './modules/modules/attendance.module';
import { CashBookModule } from './modules/modules/cash-book.module';
import { CarrierModule } from './modules/modules/carrier.module';
import { OrderModule } from './modules/modules/order.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/kiotviet'),
    BranchModule,
    UserModule,
    BrandModule,
    BlogModule,
    CategoriesModule,
    AttendanceModule,
    CashBookModule,
    CarrierModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
