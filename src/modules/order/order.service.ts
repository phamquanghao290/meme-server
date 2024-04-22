import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, StatusOrder } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private oderRepository: Repository<Order>,
  ) {}
  async createOrder(orderData: any) {
    // Xử lý logic tạo đơn hàng và lưu vào cơ sở dữ liệu
    console.log(orderData);
    const { userID, user_name, address, phone, status, total, addresscity } =
      orderData;
    const createdOrder = this.oderRepository.create({
      user: userID,
      total,
      status_order: status,
      phone: phone,
      address,
      user_name,
      addressCity: addresscity,
    });

    return await this.oderRepository.save(createdOrder);
  }

  findAll() {
    return this.oderRepository.find();
  }

  async getBillById(id: any) {
    return await this.oderRepository
      .createQueryBuilder('order')
      .where('order.user_id = :id', { id })
      .getMany();
  }
  async cancelOrder(id: number) {
    await this.oderRepository.createQueryBuilder().update(Order).set({
      status_order: StatusOrder.Canceled,
    })
    .where({ id: id }).execute();
      
    return 'Cancelled successfully';
  }

  async acceptOrder(id: number) {
    await this.oderRepository.createQueryBuilder().update(Order).set({
      status_order: StatusOrder.Accepted,
    })
    .where({ id: id }).execute();
      
    return 'Accepted successfully';
  }
  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
