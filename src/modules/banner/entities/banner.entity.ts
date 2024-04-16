import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('banner')
export class Banner {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type:"varchar",
        length:255
    })
    name: string;

    @Column({
        type:"longtext",
        nullable:true
    })
    image: string;

    @Column({
        type:"varchar",
        default:255
    })
    type:string;
}
