import { Injectable, NotFoundException } from '@nestjs/common';
 
import { Prisma, Cart } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  // Get the cart for a specific user, including cart items
  async getCart(userId: number): Promise<Cart | null> {
    return this.prisma.cart.findFirst({
      where: { userId },
      include: { product: true }, // Include product details
    });
  }

  // Add an item to the user's cart
  async addItem(userId: number, productId: number, quantity: number): Promise<Cart> {
    // Check if the product exists
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    // Check if the cart item already exists
    const existingCartItem = await this.prisma.cart.findFirst({
      where: { userId, productId },
    });

    if (existingCartItem) {
      // Update the quantity of the existing item
      return this.prisma.cart.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
      });
    } else {
      // Create a new cart item
      return this.prisma.cart.create({
        data: { userId, productId, quantity },
      });
    }
  }
  // Remove an item from the cart
  async removeItem(userId: number, productId: number): Promise<Cart> {
    const cart = await this.getCart(userId);
    if (!cart) {
      throw new NotFoundException(`Cart for user with ID ${userId} not found`);
    }

    const item = await this.prisma.cart.findFirst({
      where: { userId, productId },
    });

    if (!item) {
      throw new NotFoundException(`Cart item with product ID ${productId} not found`);
    }

    return this.prisma.cart.delete({
      where: { id: item.id },
    });
  }

  // Clear all items from a user's cart
  async clearCart(userId: number): Promise<void> {
    const cart = await this.getCart(userId);
    if (cart) {
      await this.prisma.cart.deleteMany({ where: { userId } });
    }
  }
}
