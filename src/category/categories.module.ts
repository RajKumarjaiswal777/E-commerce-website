import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

 

@Module({
  providers: [CategoriesService,PrismaService,ConfigService],
  controllers: [CategoriesController]
})
export class CategoryModule {}
