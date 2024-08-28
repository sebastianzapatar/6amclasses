import { Ingredient } from "src/ingredients/entities/ingredient.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Image {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text',
        {unique:true}
    )
    url:string

    @ManyToOne(() => Ingredient, ingredient => ingredient.images,{
        cascade:true,
        eager:true
    })
    ingredient?: Ingredient;
}
