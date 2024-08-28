import { Image } from "src/images/entities/image.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ingredient {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text',
        {
            unique:true
        }
    )
    name:string
    @OneToMany(() => Image, image => image.ingredient)
    images: Image[];
}
