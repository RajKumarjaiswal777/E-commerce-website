import { Body, Controller, Post, Param, ParseIntPipe, NotFoundException, BadRequestException } from '@nestjs/common';
import { CartService } from './cart.service';
import { Prisma, Cart } from '@prisma/client';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addItem(
    @Body('userId', ParseIntPipe) userId: number,
    @Body('productId', ParseIntPipe) productId: number,
    @Body('quantity', ParseIntPipe) quantity: number,
  ): Promise<Cart> {
    if (quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than 0');
    }
    
    // Add item to the cart
    try {
      return await this.cartService.addItem(userId, productId, quantity);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Cart or Product not found: ${error.message}`);
      }
      throw error;
    }
  }
}
