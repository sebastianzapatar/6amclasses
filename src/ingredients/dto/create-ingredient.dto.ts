import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class CreateIngredientDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @ApiProperty({ example: 'Carrot, Onion, Fish', 
        description: 'The name of the ingridient' })
    name:string
}
