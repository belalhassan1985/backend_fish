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
    async getCategoryDescendantIds(slug) {
        const category = await this.prisma.category.findUnique({
            where: { slug },
            include: { children: { include: { children: true } } }
        });
        if (!category)
            return null;
        const ids = [category.id];
        for (const child of category.children) {
            ids.push(child.id);
            for (const grandchild of child.children ?? []) {
                ids.push(grandchild.id);
            }
        }
        return ids;
    }
    async buildWhere(query) {
        const where = { isActive: true };
        if (query.categorySlug) {
            const ids = await this.getCategoryDescendantIds(query.categorySlug);
            if (ids) {
                where.categoryId = ids.length === 1 ? ids[0] : { in: ids };
            }
            else {
                return null;
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
    buildOrderBy(sort, order) {
        return sort
            ? { [sort]: order || 'desc' }
            : { isFeatured: 'desc' };
    }
    include = {
        media: { orderBy: { displayOrder: 'asc' } },
        category: true,
        tags: { include: { tag: true } }
    };
    async findAll(query) {
        const where = await this.buildWhere(query);
        if (!where)
            return [];
        return this.prisma.product.findMany({
            where,
            include: this.include,
            orderBy: this.buildOrderBy(query.sort, query.order),
            take: query.limit,
        });
    }
    async findAllPaginated(query) {
        const where = await this.buildWhere(query);
        if (!where)
            return { data: [], total: 0, page: query.page, limit: query.limit, totalPages: 0 };
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
    async findOne(slug) {
        return this.prisma.product.findUnique({
            where: { slug },
            include: this.include,
        });
    }
    async findById(id) {
        return this.prisma.product.findUnique({
            where: { id },
            include: this.include,
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