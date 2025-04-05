import { Product } from 'src/modules/products/entities/product.entity';

export class Category {
    id: number;
    name: string;
    products: Product[];
}
