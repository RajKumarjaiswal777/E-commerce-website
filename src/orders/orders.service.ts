import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Import PrismaService
import { Prisma, Order, OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async createOrder(userId: number, totalAmount: number): Promise<Order> {
    return this.prisma.order.create({
      data: {
        userId,
        totalAmount,
      },
    });
  }

  async getOrderById(id: number): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async getOrdersByUser(userId: number): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: { userId },
    });
  }

  async updateOrderStatus(id: number, status: OrderStatus): Promise<Order> {
    const orderId = parseInt(id.toString(), 10);
    return this.prisma.order.update({
      where: { id: orderId},
      data: { status },
    });
  }
}
