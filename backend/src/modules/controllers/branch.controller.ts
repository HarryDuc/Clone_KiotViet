import { Controller, Get, Post, Body, Param, BadRequestException, UseGuards, Put } from '@nestjs/common';
import { BranchService } from '../services/branch.service';
import { Branch } from '../schemas/branch.schema';
import { AdminGuard } from '../auth/guard/auth.guard';

@Controller('branches')
export class BranchController {
  constructor(private readonly branchService: BranchService) { }

  @Post()
  @UseGuards(AdminGuard)
  async create(@Body() createBranchDto: { name: string; location: string }): Promise<Branch> {
    if (!createBranchDto.name || !createBranchDto.location) {
      throw new BadRequestException('Name and location are required');
    }
    return this.branchService.create(createBranchDto);
  }

  // @Put(':id')
  // async findOne(@Param('id') id: string): Promise<Branch> {
  //   return this.branchService.findOne(id);
  // }

  @Get()
  async findAll(): Promise<Branch[]> {
    return this.branchService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Branch> {
    return this.branchService.findOne(id);
  }
}