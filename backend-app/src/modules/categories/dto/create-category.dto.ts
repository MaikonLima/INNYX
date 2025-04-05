import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty({
        description: 'Nome da categoria',
        maxLength: 100,
        example: 'Eletrônicos',
    })
    @IsNotEmpty()
    @MaxLength(100)
    name: string;
}
