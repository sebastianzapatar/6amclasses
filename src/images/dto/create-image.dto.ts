import { IsObject, IsString, MinLength } from "class-validator";
import { Ingredient } from "src/ingredients/entities/ingredient.entity";

export class CreateImageDto {
    @IsString()
    @MinLength(2)
    url:string

    @IsObject()
    ingredient:Ingredient
}
