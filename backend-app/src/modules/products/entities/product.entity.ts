import { IsNotEmpty, IsPositive, MaxLength, IsDate, MinDate } from 'class-validator';
import { Type } from 'class-transformer';
import { Category } from 'src/modules/categories/entities/category.entity';

export class Product {
    id: number;

    @IsNotEmpty()
    @MaxLength(50)
    name: string;

    @IsNotEmpty({message: 'O campo de descrição é obrigatório.'})
    @MaxLength(200)
    description: string;

    @IsPositive()
    price: number;

    @IsDate()
    @Type(() => Date)
    @MinDate(new Date(), { message: 'A validade deve ser uma data futura' })
    expirationDate: Date;

    @IsNotEmpty()
    imageName: string;

    @IsNotEmpty()
    category: Category;

    @IsNotEmpty()
    categoryId: number;

    @IsNotEmpty()
    createdAt: Date;
}
