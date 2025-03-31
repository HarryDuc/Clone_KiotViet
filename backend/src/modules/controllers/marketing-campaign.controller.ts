import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { MarketingCampaignService } from '../services/marketing-campaign.service';
import { MarketingCampaign } from '../schemas/marketing-campaign.schema';

@Controller('marketing-campaigns')
export class MarketingCampaignController {
  constructor(private readonly marketingCampaignService: MarketingCampaignService) { }

  @Post()
  async create(@Body() createCampaignDto: any): Promise<MarketingCampaign> {
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
    @Body() updateCampaignDto: any,
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

  @Post(':id/schedule')
  async schedule(
    @Param('id') id: string,
    @Body() schedule: any,
  ): Promise<MarketingCampaign> {
    return this.marketingCampaignService.update(id, {
      'campaignSettings.schedule': schedule,
      status: 'scheduled',
    });
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

  // @Get(':id/analytics')
  // async getAnalytics(@Param('id') id: string): Promise<any> {
  //   const campaign = await this.marketingCampaignService.findOne(id);
  //   return campaign.analytics;
  // }
}