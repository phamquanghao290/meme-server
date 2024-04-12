import { ProductDetail } from 'src/modules/product_detail/entities/product_detail.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('image')
export class Image {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @OneToMany(() => ProductDetail, (productDetail) => productDetail.imageId)
    productDetail: ProductDetail[];
}
