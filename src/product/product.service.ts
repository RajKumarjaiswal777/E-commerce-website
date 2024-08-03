import { Injectable, NotFoundException } from '@nestjs/common';
 
import { Prisma, Product } from '@prisma/client';
 
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  
  async createProduct(data: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({
      data: {
        name: data.name,
        colors: data.colors,
        sizes: data.sizes,
        material: data.material,
        seasonal: data.seasonal,
        offers: data.offers,
        categoryId: data.categoryId,
      },
    });
  }

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async updateProduct(id: number, data: UpdateProductDto): Promise<Product> {


    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async deleteProduct(id: number): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
