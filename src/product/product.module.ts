import { Module } from '@nestjs/common';
 
import { ProductsService } from './product.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsController } from './product.controller';

@Module({
  controllers: [ProductsController],
  providers: [PrismaService,ConfigService,ProductsService]
})
export class ProductModule {}
