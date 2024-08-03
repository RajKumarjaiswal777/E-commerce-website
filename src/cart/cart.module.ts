import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [CartService,PrismaService, ConfigService],
  controllers: [CartController]
})
export class CartModule {}
