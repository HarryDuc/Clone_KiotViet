import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicePackage, ServicePackageSchema } from '../schemas/service-package.schems';
import { ServicePackageService } from '../services/service-package.service';
import { ServicePackageController } from '../controllers/service-package.controller';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ServicePackages', schema: ServicePackageSchema }])
  ],
  controllers: [ServicePackageController],
  providers: [ServicePackageService],
  exports: [ServicePackageService]
})
export class ServicePackageModule { }
