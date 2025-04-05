import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthDto {
    @ApiProperty({ example: 'teste@teste.com' })
    @IsEmail({}, { message: 'E-mail inválido' })
    email: string;

    @ApiProperty({ example: 'senha123' })
    @IsNotEmpty({ message: 'A senha é obrigatória' })
    password: string;
}