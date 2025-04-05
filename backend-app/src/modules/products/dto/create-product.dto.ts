import {
  IsNotEmpty,
  IsPositive,
  MaxLength,
  IsDateString,
  Validate,
  MinDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsFutureDate } from '../validators/is-future-date.validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nome do produto',
    maxLength: 50,
    example: 'Smartphone Galaxy S23',
  })
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: 'Descrição detalhada do produto',
    maxLength: 200,
    example: 'Smartphone com 256GB, 5G, câmera tripla, tela AMOLED',
  })
  @IsNotEmpty({ message: 'O campo de descrição é obrigatório.' })
  @MaxLength(200)
  description: string;

  @ApiProperty({
    description: 'Preço do produto (positivo)',
    example: 2999.99,
  })
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'Data de validade (deve ser futura)',
    example: '2025-12-31',
  })
  @IsDateString()
  @Validate(IsFutureDate, { message: 'A validade deve ser uma data futura' })
  @Type(() => Date)
  @MinDate(new Date(), { message: 'A validade deve ser uma data futura' })
  expirationDate: string;

  @ApiProperty({
    description: 'Nome único da imagem associada',
    example: 's23-2025-01-01.png',
  })
  @IsNotEmpty()
  imageName: string;

  @ApiProperty({
    description: 'ID da categoria associada ao produto',
    example: 1,
  })
  @IsNotEmpty()
  categoryId: number;
}
