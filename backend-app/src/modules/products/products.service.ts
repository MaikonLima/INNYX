import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateProductDto) {
        return this.prisma.product.create({
            data: {
                name: data.name,
                description: data.description,
                price: data.price,
                image: data.imageName,
                expirationDate: new Date(data.expirationDate),
                createdAt: new Date(),
                category: {
                    connect: { id: data.categoryId },
                },
            },
        });
    }

    async findAll(query: PaginateQuery) {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const search = query.search || '';

        const where = search
            ? {
                OR: [
                    { name: { contains: search } },
                    { description: { contains: search } },
                ],
            }
            : {};

        const [total, items] = await this.prisma.$transaction([
            this.prisma.product.count({ where }),
            this.prisma.product.findMany({
                where,
                include: { category: true },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
        ]);

        return {
            meta: {
                totalItems: total,
                itemCount: items.length,
                itemsPerPage: limit,
                totalPages: Math.ceil(total / limit),
                currentPage: page,
            },
            items,
        };
    }

    async findOne(id: number) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
            },
        });

        if (!product) {
            throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
        }

        return product;
    }

    async update(id: number, data: UpdateProductDto) {
        await this.findOne(id);

        return this.prisma.product.update({
            where: { id },
            data: {
                ...data,
                expirationDate: data.expirationDate
                    ? new Date(data.expirationDate)
                    : undefined,
            },
        });
    }

    async remove(id: number) {
        await this.findOne(id);

        return this.prisma.product.delete({
            where: { id },
        });
    }
}
