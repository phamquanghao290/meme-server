import { Module, forwardRef } from '@nestjs/common';
import { ProductDetailService } from './product_detail.service';
import { ProductDetailController } from './product_detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { CartModule } from '../cart/cart.module';
import { ProductDetail } from './entities/product_detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductDetail]),
  forwardRef(() =>CartModule )],
  controllers: [ProductDetailController],
  providers: [ProductDetailService],
  exports: [ProductDetailService],
})
export class ProductDetailModule {}
