import { IsString } from "class-validator";

export class CreateDishDto {
    @IsString()
    name:string
}
