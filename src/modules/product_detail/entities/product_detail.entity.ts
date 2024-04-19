import { Cart } from 'src/modules/cart/entities/cart.entity';

import { Image } from 'src/modules/image/entities/image.entity';
import { Product } from 'src/modules/products/entities/product.entity';

import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity('product_detail')
export class ProductDetail {
  @PrimaryGeneratedColumn()
  product_detail_id: number;

  @ManyToOne(() => Product, (product) => product.productDetail)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({
    nullable: true,
    type: 'text',
  })
  description: string;

  

  @ManyToOne(() => Image, (image) => image.id)
  @JoinColumn({ name: 'image_id' })
  imageId: Image[];

 
}