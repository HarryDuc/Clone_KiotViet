import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BranchService } from '../services/branch.service';
import { Branch } from '../schemas/branch.schema';
import { CreateBranchDTO, UpdateBranchDTO } from '../dtos/branch.dto';

@Controller('api/branches')
export class BranchController {
  constructor(private readonly branchService: BranchService) { }

  @Post()
  async create(@Body() createBranchDto: CreateBranchDTO): Promise<Branch> {
    return this.branchService.create(createBranchDto);
  }

  @Get()
  findAll() {
    return this.branchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.branchService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBranchDto: UpdateBranchDTO) {
    return this.branchService.update(id, updateBranchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.branchService.remove(id);
  }
}