import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User, UserDocument } from '../schemas/user.schema';
import { Branch, BranchDocument } from '../schemas/branch.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Branch.name) private branchModel: Model<BranchDocument>,
  ) { }

  async register(name: string, email: string, password: string, role: string, branch: string, phone: string) {
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Kiểm tra xem branch có tồn tại không
    const branchExists = await this.branchModel.findById(branch);
    if (!branchExists) {
      throw new NotFoundException('Branch not found');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({
      name,
      email,
      password: hashedPassword,
      role,
      branch,
      phone
    });
    await user.save();
    return { message: 'User registered successfully' };
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email }).populate('branch');
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = jwt.sign({ userId: user._id, branchId: user.branch._id, isAdmin: user.isAdmin }, 'your-secret-key', { expiresIn: '1h' });
    return { token, user };
  }
}
