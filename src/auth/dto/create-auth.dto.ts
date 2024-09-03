import { IsEmail, IsString, Matches, Max, MaxLength, MinLength } from "class-validator";

export class CreateAuthDto {

    @IsEmail()
    email:string;

    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 
        { message: 'password too weak' })
    @MinLength(12)
    @MaxLength(50)
    password:string;

    @IsString()
    @MaxLength(80)
    fullName:string;
}
