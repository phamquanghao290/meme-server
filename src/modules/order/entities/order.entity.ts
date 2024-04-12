import { OrderDetail } from 'src/modules/order-detail/entities/order-detail.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.order)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    address: string;

    @Column()
    phone: string;

    @Column()
    status_order: number;

    @Column()
    total: number;

    @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
    orderDetail: OrderDetail;
}
