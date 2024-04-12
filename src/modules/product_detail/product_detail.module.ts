import { Module } from '@nestjs/common';
import { ProductDetailService } from './product_detail.service';
import { ProductDetailController } from './product_detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductDetailController],
  providers: [ProductDetailService],
})
export class ProductDetailModule {}
