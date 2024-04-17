import { Module, forwardRef } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { ProductDetailModule } from '../product_detail/product_detail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cart]),
    forwardRef(() => ProductDetailModule)
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
