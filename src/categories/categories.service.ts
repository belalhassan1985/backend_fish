import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoriesService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.CategoryUncheckedCreateInput) {
        try {
            return await this.prisma.category.create({ data });
        } catch (error) {
            console.error('Error creating category:', error);
            throw error;
        }
    }

    async findAll() {
        // Return tree structure: Roots -> Children -> Grandchildren
        return this.prisma.category.findMany({
            where: { parentId: null },
            include: {
                children: {
                    orderBy: { sortOrder: 'asc' },
                    include: {
                        children: {
                            orderBy: { sortOrder: 'asc' },
                        },
                    },
                },
            },
            orderBy: { sortOrder: 'asc' },
        });
    }

    async findOne(id: number) {
        return this.prisma.category.findUnique({
            where: { id },
            include: { children: true },
        });
    }

    async update(id: number, data: Prisma.CategoryUncheckedUpdateInput) {
        try {
            return await this.prisma.category.update({
                where: { id },
                data,
            });
        } catch (error) {
            console.error(`Error updating category ${id}:`, error);
            throw error;
        }
    }

    async remove(id: number) {
        return this.prisma.category.delete({
            where: { id },
        });
    }

    async toggleActive(id: number) {
        const category = await this.prisma.category.findUnique({ where: { id } });
        if (!category) return null;
        return this.prisma.category.update({
            where: { id },
            data: { isActive: !category.isActive },
        });
    }
}
