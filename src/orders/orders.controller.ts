import { Controller, Post, Get, Put, Param, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from '@prisma/client';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(
    @Body('userId') userId: number,
    @Body('totalAmount') totalAmount: number
  ): Promise<Order> {
    return this.ordersService.createOrder(userId, totalAmount);
  }

  @Get(':id')
  async getOrderById(@Param('id') id: number): Promise<Order> {
    return this.ordersService.getOrderById(+id);
  }

  @Get('user/:userId')
  async getOrdersByUser(@Param('userId') userId: number): Promise<Order[]> {
    return this.ordersService.getOrdersByUser(+userId);
  }

  @Put(':id/status')
  async updateOrderStatus(
    @Param('id') id: number,
    @Body('status') status: string
  ): Promise<Order> {
    return this.ordersService.updateOrderStatus(id, status as any);
  }
}
