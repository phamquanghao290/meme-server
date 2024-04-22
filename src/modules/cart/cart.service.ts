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
  async create(userId: any, product: any) {
    const check = await this.getCartByUserId(userId, product.id);
    if (check.length > 0) {
      return {
        message: 'already in the cart',
      };
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
        message: 'Product added to cart',
        data: newCart.execute(),
      };
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

  async findAll() {
    // lấy ra tất cả user_id trong bảng cart
    return await this.cartRepository
      .createQueryBuilder('cart')
      .select()
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
    const cart = await this.cartRepository.findOneOrFail({
      where: { id: createCartDto.id },
    });
    cart.quantity = cart.quantity + 1;
    return await this.cartRepository.save(cart);
  }

  async decreaseStock(createCartDto: any) {
    const cart = await this.cartRepository.findOneOrFail({
      where: { id: createCartDto.id },
    });
    cart.quantity = cart.quantity - 1;
    return await this.cartRepository.save(cart);
  }

  async remove(id: number) {
    await this.cartRepository.delete(id);
    return {
      status: 'success',
      message: 'deleted successfully',
    };
  }
  async deleteAll(userId: number) {
    await this.cartRepository
      .createQueryBuilder()
      .delete()
      .from(Cart)
      .where('user = :user', { user: userId })
      .execute();
    return `Deleted cart successfully`;
  }
}
