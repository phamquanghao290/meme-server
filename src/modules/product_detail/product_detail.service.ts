import { Injectable } from '@nestjs/common';
import { CreateProductDetailDto } from './dto/create-product_detail.dto';
import { UpdateProductDetailDto } from './dto/update-product_detail.dto';
import { ProductDetail } from './entities/product_detail.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductDetailService {
   constructor(
    @InjectRepository(ProductDetail)
     private productdetailRepository: Repository<ProductDetail>
     ) { }
  create(createProductDetailDto: CreateProductDetailDto) {
    return 'This action adds a new productDetail';
  }
  
  findAll() {
    return `This action returns all productDetail`;
  }

 async findOne(id: number, color:number, size:number) {
     const idProductDetail = await this.productdetailRepository.createQueryBuilder('productDetail')
      .select()
      .where({ product: id, color: color, size: size })
      .getOne();
  }

  update(id: number, updateProductDetailDto: UpdateProductDetailDto) {
    return `This action updates a #${id} productDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} productDetail`;
  }
}
