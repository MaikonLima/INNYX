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
    maxLength: 200,
    example: 'Smartphone Galaxy S23',
  })
  @IsNotEmpty()
  @MaxLength(200)
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
    example: '2025-12-31T00:00:00.000Z',
  })
  @Validate(IsFutureDate, { message: 'A validade deve ser uma data futura' })
  @Type(() => Date)
  @MinDate(new Date(), { message: 'A validade deve ser uma data futura' })
  expirationDate: Date;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
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
