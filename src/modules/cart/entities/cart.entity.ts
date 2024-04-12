import { ProductDetail } from "src/modules/product_detail/entities/product_detail.entity";
import { User } from "src/modules/user/entities/user.entity";
import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn, OneToMany, ManyToOne } from "typeorm";

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.cart)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => ProductDetail, (productDetail) => productDetail.cart, {cascade: true})
  @JoinColumn({ name: 'product_detail_id' })
  product_detail_id: ProductDetail;

  @Column()
  quantity: number;
}
