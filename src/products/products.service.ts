import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, ProductType, WaterType, Difficulty } from '@prisma/client';

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.ProductUncheckedCreateInput) {
        try {
            return await this.prisma.product.create({
                data: {
                    ...data,
                    media: data.media ? {
                        create: (data.media as any).create.map((m: any) => ({
                            ...m,
                            // Ensure undefineds are removed or handled if Prisma doesn't like them
                        }))
                    } : undefined
                }
            });
        } catch (error) {
            if (error.code === 'P2002') {
                throw new ConflictException('Product with this SKU already exists');
            }
            console.error('Error creating product:', error);
            throw error;
        }
    }

    async findAll(query: { categorySlug?: string; q?: string; type?: ProductType; featured?: boolean; tag?: string }) {
        const where: Prisma.ProductWhereInput = { isActive: true };

        if (query.categorySlug) {
            const category = await this.prisma.category.findUnique({ where: { slug: query.categorySlug } });
            if (category) {
                // Optional: Include children categories logic here if needed. 
                // For now, exact match or use SQL param to find children.
                // Let's simplified: exact match.
                where.categoryId = category.id;
            } else {
                return []; // Category not found
            }
        }

        if (query.q) {
            where.OR = [
                { nameAr: { contains: query.q } },
                { nameEn: { contains: query.q } },
            ];
        }

        if (query.type) {
            where.productType = query.type;
        }

        if (query.featured) {
            where.isFeatured = true; // Assumes input is boolean true or 'true' needed parsing in controller
        }

        if (query.tag) {
            where.tags = { some: { tag: { slug: query.tag } } };
        }

        return this.prisma.product.findMany({
            where,
            include: {
                media: { orderBy: { displayOrder: 'asc' } },
                category: true,
                tags: { include: { tag: true } }
            },
            orderBy: { isFeatured: 'desc' }, // Featured first, then arbitrary (id)
        });
    }

    async findOne(slug: string) {
        return this.prisma.product.findUnique({
            where: { slug },
            include: {
                media: { orderBy: { displayOrder: 'asc' } },
                category: true,
                tags: { include: { tag: true } }
            },
        });
    }

    async findById(id: number) {
        return this.prisma.product.findUnique({
            where: { id },
            include: {
                media: { orderBy: { displayOrder: 'asc' } },
                category: true,
                tags: { include: { tag: true } }
            },
        });
    }

    async update(id: number, data: Prisma.ProductUncheckedUpdateInput) {
        try {
            return await this.prisma.product.update({ where: { id }, data });
        } catch (error) {
            if (error.code === 'P2002') {
                throw new ConflictException('Product with this SKU already exists');
            }
            console.error(`Error updating product ${id}:`, error);
            throw error;
        }
    }

    async remove(id: number) {
        return this.prisma.product.delete({ where: { id } });
    }

    async toggleActive(id: number) {
        const p = await this.prisma.product.findUnique({ where: { id } });
        if (!p) return null;
        return this.prisma.product.update({ where: { id }, data: { isActive: !p.isActive } });
    }
}
