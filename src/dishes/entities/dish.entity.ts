import { IsString, MinLength } from "class-validator";
import { Ingredient } from "src/ingredients/entities/ingredient.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Dish {
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    name:string
    
    @ManyToMany(()=>Ingredient,
    (ingredient)=>ingredient.dishes)
    ingredients:Ingredient[]
}
