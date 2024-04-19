import { OrderDetail } from 'src/modules/order-detail/entities/order-detail.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

enum StatusOrder {
  Pending = 0,
  Accepted = 1,
  Completed = 2,
  Canceled = 3,
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.order)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: 'text',
  })
  address: string;
  @Column({
    type: 'text',
  })
  addressCity: string;
  @Column({
    type: 'varchar',
    length: 255,
  })
  user_name: string;
  @Column()
  phone: string;

  @Column({

    type: 'enum',
    enum: StatusOrder,
  })
  status_order: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  total: number;

  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetail: OrderDetail;
}
