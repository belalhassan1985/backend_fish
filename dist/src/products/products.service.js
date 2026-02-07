"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductsService = class ProductsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        try {
            return await this.prisma.product.create({
                data: {
                    ...data,
                    media: data.media ? {
                        create: data.media.create.map((m) => ({
                            ...m,
                        }))
                    } : undefined
                }
            });
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.ConflictException('Product with this SKU already exists');
            }
            console.error('Error creating product:', error);
            throw error;
        }
    }
    async findAll(query) {
        const where = { isActive: true };
        if (query.categorySlug) {
            const category = await this.prisma.category.findUnique({ where: { slug: query.categorySlug } });
            if (category) {
                where.categoryId = category.id;
            }
            else {
                return [];
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
        const orderBy = query.sort
            ? { [query.sort]: query.order || 'desc' }
            : { isFeatured: 'desc' };
        return this.prisma.product.findMany({
            where,
            include: {
                media: { orderBy: { displayOrder: 'asc' } },
                category: true,
                tags: { include: { tag: true } }
            },
            orderBy,
            take: query.limit,
        });
    }
    async findOne(slug) {
        return this.prisma.product.findUnique({
            where: { slug },
            include: {
                media: { orderBy: { displayOrder: 'asc' } },
                category: true,
                tags: { include: { tag: true } }
            },
        });
    }
    async findById(id) {
        return this.prisma.product.findUnique({
            where: { id },
            include: {
                media: { orderBy: { displayOrder: 'asc' } },
                category: true,
                tags: { include: { tag: true } }
            },
        });
    }
    async update(id, data) {
        try {
            return await this.prisma.product.update({ where: { id }, data });
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.ConflictException('Product with this SKU already exists');
            }
            console.error(`Error updating product ${id}:`, error);
            throw error;
        }
    }
    async remove(id) {
        return this.prisma.product.delete({ where: { id } });
    }
    async toggleActive(id) {
        const p = await this.prisma.product.findUnique({ where: { id } });
        if (!p)
            return null;
        return this.prisma.product.update({ where: { id }, data: { isActive: !p.isActive } });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map