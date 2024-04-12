import { Brand } from 'src/modules/brand/entities/brand.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { Color } from 'src/modules/color/entities/color.entity';
import { OrderDetail } from 'src/modules/order-detail/entities/order-detail.entity';
import { ProductDetail } from 'src/modules/product_detail/entities/product_detail.entity';
import { Size } from 'src/modules/size/entities/size.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameProduct: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column({

  })
  image: string;

  @Column()
  stock: number;

  @Column()
  rate: number;

  @ManyToOne(() => Category, (category) => category.product)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => ProductDetail, (productDetail) => productDetail.product)
  productDetail: ProductDetail;

  @ManyToOne(() => Brand, (brand) => brand.product)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetail: OrderDetail;
}
