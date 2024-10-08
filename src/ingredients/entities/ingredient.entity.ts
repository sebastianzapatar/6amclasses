import { User } from "src/auth/entities/auth.entity";
import { Dish } from "src/dishes/entities/dish.entity";
import { Image } from "src/images/entities/image.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToMany(()=>Dish,
        (dish)=>dish.ingredients)
    @JoinTable()
    dishes:Dish[]

    @ManyToOne(()=>User,user=>user.ingredients)
    user?:User;
}
