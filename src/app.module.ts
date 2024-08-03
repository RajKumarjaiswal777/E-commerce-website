import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/categories.module';
import { CartModule } from './cart/cart.module';
 
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [AuthModule, ProductModule, CategoryModule, CartModule,  OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
