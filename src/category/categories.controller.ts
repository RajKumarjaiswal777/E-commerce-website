import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from '@prisma/client';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body('name') name: string): Promise<Category> {
    return this.categoriesService.createCategory(name);
  }

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('name') name?: string,
  ): Promise<Category> {
    return this.categoriesService.updateCategory(id, name);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.categoriesService.deleteCategory(id);
  }
}
