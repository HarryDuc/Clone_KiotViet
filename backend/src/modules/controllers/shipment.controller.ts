import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { ShipmentService } from '../services/shipment.service';
import { Shipment } from '../schemas/shipment.schema';

@Controller('api/shipments')
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) { }

  @Post()
  async create(@Body() createShipmentDto: any): Promise<Shipment> {
    return this.shipmentService.create(createShipmentDto);
  }

  @Get()
  async findAll(@Query() query: any): Promise<Shipment[]> {
    return this.shipmentService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Shipment> {
    return this.shipmentService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateShipmentDto: any,
  ): Promise<Shipment> {
    return this.shipmentService.update(id, updateShipmentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Shipment> {
    return this.shipmentService.remove(id);
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ): Promise<Shipment> {
    return this.shipmentService.updateStatus(id, status);
  }

  @Put(':id/tracking')
  async updateTracking(
    @Param('id') id: string,
    @Body() tracking: any,
  ): Promise<Shipment> {
    return this.shipmentService.updateTracking(id, tracking);
  }

  @Put(':id/carrier')
  async updateCarrier(
    @Param('id') id: string,
    @Body('carrierId') carrierId: string,
  ): Promise<Shipment> {
    return this.shipmentService.updateCarrier(id, carrierId);
  }

  @Get('store/:storeId')
  async findByStore(@Param('storeId') storeId: string): Promise<Shipment[]> {
    return this.shipmentService.findByStore(storeId);
  }

  @Get('order/:orderId')
  async findByOrder(@Param('orderId') orderId: string): Promise<Shipment[]> {
    return this.shipmentService.findByOrder(orderId);
  }
}
