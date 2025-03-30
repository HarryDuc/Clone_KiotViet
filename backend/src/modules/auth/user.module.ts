import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { Branch, BranchSchema } from '../schemas/branch.schema';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Branch.name, schema: BranchSchema }]),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule { }
