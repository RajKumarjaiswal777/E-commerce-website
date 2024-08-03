import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [OrdersService,PrismaService, ConfigService],
  controllers: [OrdersController]
})
export class OrdersModule {}
