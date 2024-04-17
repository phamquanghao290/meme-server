import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { ProductDetailService } from '../product_detail/product_detail.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    private productDetailService: ProductDetailService,
  ) {}

  async getCartByUserId(userId: any, productId: any) {
    return await this.cartRepository
      .createQueryBuilder('cart')
      .select()
      .where({ user: userId })
      .andWhere({ product: productId })
      .getMany();
  }
  async create(userId: any, product: any, colorId: any, sizeId: any) {
    const check = await this.getCartByUserId(userId, product.id);
    if (check.length > 0) {
      const cart = check[0];
      cart.quantity = cart.quantity + 1;
      return  {
        message: 'tang so luong',
        data: this.cartRepository.save(cart)
      }
    } else {
      const newCart = this.cartRepository
        .createQueryBuilder('cart')
        .insert()
        .into(Cart)
        .values({
          user: userId,
          product: product.id,
          quantity: 1,
        });
      return {
        message:"them thanh cong",
         data: newCart.execute()
      }
    }
  }
  async findOne(id: number) {
    return await this.cartRepository
      .createQueryBuilder('cart')
      .select()
      .where('cart.user_id = :id', { id })
      .innerJoinAndSelect('cart.product', 'product')
      .getMany();
  }

  async updateQuantity(userId: number, productId: number, quantity: number) {
    return await this.cartRepository
      .createQueryBuilder('cart')
      .update(Cart)
      .set({ quantity: quantity })
      .where({ user: userId, product: productId })
      .execute();
  }

  async increaseStock(createCartDto: any) {
    console.log(createCartDto)
    const cart = await this.cartRepository.findOneOrFail({
      where: {id: createCartDto.id},
    })
    console.log(cart)
    cart.quantity = cart.quantity + 1
    return await this.cartRepository.save(cart)
  }

  async decreaseStock(createCartDto: any) {
    const cart = await this.cartRepository.findOneOrFail({
      where: {id: createCartDto.id},
    })
    cart.quantity = cart.quantity - 1
    return await this.cartRepository.save(cart)
  }

  async remove(id: number) {
    await this.cartRepository.delete(id);
    return {
      status: 'success',
      message: 'Xóa thành công',
    }

  }
}
