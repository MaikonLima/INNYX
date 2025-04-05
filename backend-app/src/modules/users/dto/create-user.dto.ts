import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, MaxLength, IsArray, ArrayNotEmpty, IsInt } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        description: 'Nome do usuário',
        maxLength: 100,
        example: 'João de Barro',
    })
    @IsNotEmpty({ message: 'O nome é obrigatório.' })
    @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres.' })
    name: string;

    @ApiProperty({
        description: 'E-mail do usuário',
        maxLength: 50,
        example: 'teste@teste.com',
    })
    @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
    @IsEmail({}, { message: 'O e-mail deve ser válido.' })
    email: string;

    @ApiProperty({
        description: 'Senha do usuário',
        maxLength: 50,
    })
    @IsNotEmpty({ message: 'A senha é obrigatória.' })
    @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
    password: string;

    @ApiProperty({
        description: 'Lista de IDs dos papéis (roles) do usuário',
        example: [1],
        type: [Number],
    })
    @IsArray({ message: 'Roles deve ser uma lista de IDs.' })
    @ArrayNotEmpty({ message: 'É necessário informar pelo menos um role.' })
    @IsInt({ each: true, message: 'Cada role deve ser um número inteiro.' })
    roles: number[];
}
