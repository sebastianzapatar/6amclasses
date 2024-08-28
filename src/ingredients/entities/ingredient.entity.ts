import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

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
}
