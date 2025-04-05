import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateCategoryDto) {
        return this.prisma.category.create({
            data,
        });
    }

    async findAll() {
        return this.prisma.category.findMany({
            include: {
                products: true,
            },
        });
    }

    async findOne(id: number) {
        const category = await this.prisma.category.findUnique({
            where: { id },
            include: {
                products: true,
            },
        });

        if (!category) {
            throw new NotFoundException(`Categoria com id ${id} não encontrada.`);
        }

        return category;
    }

    async update(id: number, data: UpdateCategoryDto) {
        await this.findOne(id);

        return this.prisma.category.update({
            where: { id },
            data,
        });
    }

    async remove(id: number) {
        await this.findOne(id);

        return this.prisma.category.delete({
            where: { id },
        });
    }
}
