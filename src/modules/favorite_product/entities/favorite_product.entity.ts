import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favorite_product')
export class FavoriteProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    productId: number;
}
