import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LivestreamService } from '../services/livestream.service';
import { CreateLiveStreamDTO, UpdateLiveStreamDTO } from '../dtos/livestream.dto';
@Controller('api/livestreams')
export class LivestreamController {
  constructor(private readonly livestreamService: LivestreamService) { }

  @Post()
  create(@Body() createLiveStreamDto: CreateLiveStreamDTO) {
    return this.livestreamService.create(createLiveStreamDto);
  }

  @Get()
  findAll() {
    return this.livestreamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.livestreamService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLiveStreamDto: UpdateLiveStreamDTO) {
    return this.livestreamService.update(id, updateLiveStreamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.livestreamService.remove(id);
  }
}