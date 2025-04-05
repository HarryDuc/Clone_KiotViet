import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { MarketingCampaignService } from '../services/marketing-campaign.service';
import { MarketingCampaign } from '../schemas/marketing-campaign.schema';
import { CreateMarketingCampaignDTO, UpdateMarketingCampaignDTO } from '../dtos/marketing-campaign.dto';
@Controller('marketing-campaigns')
export class MarketingCampaignController {
  constructor(private readonly marketingCampaignService: MarketingCampaignService) { }

  @Post()
  async create(@Body() createCampaignDto: CreateMarketingCampaignDTO): Promise<MarketingCampaign> {
    return this.marketingCampaignService.create(createCampaignDto);
  }

  @Get()
  async findAll(
    @Query('branchId') branchId?: string,
    @Query('status') status?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('type') type?: string,
  ): Promise<MarketingCampaign[]> {
    // TODO: Implement filtering logic in service
    return this.marketingCampaignService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MarketingCampaign> {
    return this.marketingCampaignService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCampaignDto: UpdateMarketingCampaignDTO,
  ): Promise<MarketingCampaign> {
    return this.marketingCampaignService.update(id, updateCampaignDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<MarketingCampaign> {
    return this.marketingCampaignService.remove(id);
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ): Promise<MarketingCampaign> {
    return this.marketingCampaignService.update(id, { status });
  }

  @Post(':id/launch')
  async launch(@Param('id') id: string): Promise<MarketingCampaign> {
    return this.marketingCampaignService.update(id, { status: 'active' });
  }

  @Post(':id/pause')
  async pause(@Param('id') id: string): Promise<MarketingCampaign> {
    return this.marketingCampaignService.update(id, { status: 'paused' });
  }

  @Post(':id/resume')
  async resume(@Param('id') id: string): Promise<MarketingCampaign> {
    return this.marketingCampaignService.update(id, { status: 'active' });
  }

  @Post(':id/complete')
  async complete(@Param('id') id: string): Promise<MarketingCampaign> {
    return this.marketingCampaignService.update(id, { status: 'completed' });
  }

}