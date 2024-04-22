import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetail)
    private billDetailRepository: Repository<OrderDetail>,
  ) {}
  async createBillDetailer(
    orderId: number,
    productsId: number,
    quantity: number,
  ) {
    const createOderDetail = {
      order: orderId as any,
      product: productsId as any,
      quantity: quantity,
    };
    const data = await this.billDetailRepository.create(createOderDetail);
    await this.billDetailRepository.save(data);
    return 'more success';
  }
  findAll() {
    return `This action returns all orderDetail`;
  }

  async findByOrder(id: number) {
    const result = await this.billDetailRepository
      .createQueryBuilder('orderDetail')
      .leftJoinAndSelect('orderDetail.product', 'productId')
      .where('orderDetail.order = :id', { id })
      .getMany();
    return result;
  }

  update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    return `This action updates a #${id} orderDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderDetail`;
  }
}
