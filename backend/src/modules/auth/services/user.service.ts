import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from '../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('Users') private userModel: Model<User>,
  ) { }

  async create(createUserDto: any): Promise<User> {
    const existingUser = await this.userModel.findOne({ email: createUserDto.email });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
  
    // Lấy userId lớn nhất từ database
    const lastUser = await this.userModel.findOne().sort({ userId: -1 }).exec();
    let newUserId = 'USR00001'; // Giá trị mặc định nếu chưa có user nào
  
    if (lastUser && lastUser.userId) {
      const lastNumber = parseInt(lastUser.userId.replace('USR', ''), 10);
      const nextNumber = lastNumber + 1;
      newUserId = `USR${nextNumber.toString().padStart(5, '0')}`;
    }
  
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = new this.userModel({
      ...createUserDto,
      userId: newUserId,
      password: hashedPassword,
    });
  
    return createdUser.save();
  }
  

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: any): Promise<User> {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const user = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async remove(id: string): Promise<User> {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role
      },
      'your-secret-key',
      { expiresIn: '1h' }
    );

    return { token, user };
  }

  async register(registerDto: any) {
    const existingUser = await this.userModel.findOne({ email: registerDto.email });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Lấy userId lớn nhất từ database
    const lastUser = await this.userModel.findOne().sort({ userId: -1 }).exec();
    let newUserId = 'USR0001'; // Giá trị mặc định nếu chưa có user nào
  
    if (lastUser && lastUser.userId) {
      const lastNumber = parseInt(lastUser.userId.replace('USR', ''), 10);
      const nextNumber = lastNumber + 1;
      newUserId = `USR${nextNumber.toString().padStart(4, '0')}`;
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = new this.userModel({
      ...registerDto,
      userId: newUserId,
      password: hashedPassword,
    });
    await user.save();
    return { message: 'User registered successfully' };
  }
}
