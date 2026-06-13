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

    private async buildWhere(query: { categorySlug?: string; q?: string; type?: ProductType; featured?: boolean; tag?: string }): Promise<Prisma.ProductWhereInput | null> {
        const where: Prisma.ProductWhereInput = { isActive: true };

        if (query.categorySlug) {
            const category = await this.prisma.category.findUnique({ where: { slug: query.categorySlug } });
            if (category) {
                where.categoryId = category.id;
            } else {
                return null; // category not found → no results
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
            where.isFeatured = true;
        }

        if (query.tag) {
            where.tags = { some: { tag: { slug: query.tag } } };
        }

        return where;
    }

    private buildOrderBy(sort?: string, order?: 'asc' | 'desc'): Prisma.ProductOrderByWithRelationInput {
        return sort
            ? { [sort]: order || 'desc' }
            : { isFeatured: 'desc' };
    }

    private include = {
        media: { orderBy: { displayOrder: 'asc' as const } },
        category: true,
        tags: { include: { tag: true } }
    };

    async findAll(query: { categorySlug?: string; q?: string; type?: ProductType; featured?: boolean; tag?: string; sort?: string; order?: 'asc' | 'desc'; limit?: number }) {
        const where = await this.buildWhere(query);
        if (!where) return [];

        return this.prisma.product.findMany({
            where,
            include: this.include,
            orderBy: this.buildOrderBy(query.sort, query.order),
            take: query.limit,
        });
    }

    async findAllPaginated(query: { categorySlug?: string; q?: string; type?: ProductType; featured?: boolean; tag?: string; sort?: string; order?: 'asc' | 'desc'; page: number; limit: number }) {
        const where = await this.buildWhere(query);
        if (!where) return { data: [], total: 0, page: query.page, limit: query.limit, totalPages: 0 };

        const skip = (query.page - 1) * query.limit;

        const [data, total] = await Promise.all([
            this.prisma.product.findMany({
                where,
                include: this.include,
                orderBy: this.buildOrderBy(query.sort, query.order),
                skip,
                take: query.limit,
            }),
            this.prisma.product.count({ where }),
        ]);

        return {
            data,
            total,
            page: query.page,
            limit: query.limit,
            totalPages: Math.ceil(total / query.limit),
        };
    }

    async findOne(slug: string) {
        return this.prisma.product.findUnique({
            where: { slug },
            include: this.include,
        });
    }

    async findById(id: number) {
        return this.prisma.product.findUnique({
            where: { id },
            include: this.include,
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
