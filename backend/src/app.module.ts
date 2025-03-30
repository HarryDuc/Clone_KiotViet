import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BranchModule } from './modules/branch.module';
import { UserModule } from './modules/auth/user.module'
import { BrandModule } from './modules/brand.module';
import { BlogModule } from './modules/blog.module';
import { CategoriesModule } from './modules/categories.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/kiotviet'),
    BranchModule,
    UserModule,
    BrandModule,
    BlogModule,
    CategoriesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
