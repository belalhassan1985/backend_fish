import { PrismaService } from '../prisma/prisma.service';
import { Prisma, ProductType } from '@prisma/client';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.ProductUncheckedCreateInput): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        nameAr: string;
        nameEn: string | null;
        description: string | null;
        isActive: boolean;
        compareAtPrice: Prisma.Decimal | null;
        categoryId: number;
        sku: string | null;
        price: Prisma.Decimal;
        stockQty: number;
        isInStock: boolean;
        isFeatured: boolean;
        productType: import(".prisma/client").$Enums.ProductType;
        waterType: import(".prisma/client").$Enums.WaterType | null;
        difficulty: import(".prisma/client").$Enums.Difficulty | null;
        sizeCmMin: number | null;
        sizeCmMax: number | null;
        tempCMin: number | null;
        tempCMax: number | null;
    }>;
    findAll(query: {
        categorySlug?: string;
        q?: string;
        type?: ProductType;
        featured?: boolean;
        tag?: string;
    }): Promise<({
        category: {
            id: number;
            slug: string;
            parentId: number | null;
            nameAr: string;
            nameEn: string | null;
            description: string | null;
            imageUrl: string | null;
            sortOrder: number;
            isActive: boolean;
        };
        media: {
            id: number;
            description: string | null;
            mediaType: import(".prisma/client").$Enums.MediaType;
            url: string | null;
            youtubeVideoId: string | null;
            title: string | null;
            isPrimary: boolean;
            displayOrder: number;
            productId: number;
        }[];
        tags: ({
            tag: {
                id: number;
                slug: string;
                nameAr: string;
            };
        } & {
            productId: number;
            tagId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        nameAr: string;
        nameEn: string | null;
        description: string | null;
        isActive: boolean;
        compareAtPrice: Prisma.Decimal | null;
        categoryId: number;
        sku: string | null;
        price: Prisma.Decimal;
        stockQty: number;
        isInStock: boolean;
        isFeatured: boolean;
        productType: import(".prisma/client").$Enums.ProductType;
        waterType: import(".prisma/client").$Enums.WaterType | null;
        difficulty: import(".prisma/client").$Enums.Difficulty | null;
        sizeCmMin: number | null;
        sizeCmMax: number | null;
        tempCMin: number | null;
        tempCMax: number | null;
    })[]>;
    findOne(slug: string): Promise<({
        category: {
            id: number;
            slug: string;
            parentId: number | null;
            nameAr: string;
            nameEn: string | null;
            description: string | null;
            imageUrl: string | null;
            sortOrder: number;
            isActive: boolean;
        };
        media: {
            id: number;
            description: string | null;
            mediaType: import(".prisma/client").$Enums.MediaType;
            url: string | null;
            youtubeVideoId: string | null;
            title: string | null;
            isPrimary: boolean;
            displayOrder: number;
            productId: number;
        }[];
        tags: ({
            tag: {
                id: number;
                slug: string;
                nameAr: string;
            };
        } & {
            productId: number;
            tagId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        nameAr: string;
        nameEn: string | null;
        description: string | null;
        isActive: boolean;
        compareAtPrice: Prisma.Decimal | null;
        categoryId: number;
        sku: string | null;
        price: Prisma.Decimal;
        stockQty: number;
        isInStock: boolean;
        isFeatured: boolean;
        productType: import(".prisma/client").$Enums.ProductType;
        waterType: import(".prisma/client").$Enums.WaterType | null;
        difficulty: import(".prisma/client").$Enums.Difficulty | null;
        sizeCmMin: number | null;
        sizeCmMax: number | null;
        tempCMin: number | null;
        tempCMax: number | null;
    }) | null>;
    findById(id: number): Promise<({
        category: {
            id: number;
            slug: string;
            parentId: number | null;
            nameAr: string;
            nameEn: string | null;
            description: string | null;
            imageUrl: string | null;
            sortOrder: number;
            isActive: boolean;
        };
        media: {
            id: number;
            description: string | null;
            mediaType: import(".prisma/client").$Enums.MediaType;
            url: string | null;
            youtubeVideoId: string | null;
            title: string | null;
            isPrimary: boolean;
            displayOrder: number;
            productId: number;
        }[];
        tags: ({
            tag: {
                id: number;
                slug: string;
                nameAr: string;
            };
        } & {
            productId: number;
            tagId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        nameAr: string;
        nameEn: string | null;
        description: string | null;
        isActive: boolean;
        compareAtPrice: Prisma.Decimal | null;
        categoryId: number;
        sku: string | null;
        price: Prisma.Decimal;
        stockQty: number;
        isInStock: boolean;
        isFeatured: boolean;
        productType: import(".prisma/client").$Enums.ProductType;
        waterType: import(".prisma/client").$Enums.WaterType | null;
        difficulty: import(".prisma/client").$Enums.Difficulty | null;
        sizeCmMin: number | null;
        sizeCmMax: number | null;
        tempCMin: number | null;
        tempCMax: number | null;
    }) | null>;
    update(id: number, data: Prisma.ProductUncheckedUpdateInput): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        nameAr: string;
        nameEn: string | null;
        description: string | null;
        isActive: boolean;
        compareAtPrice: Prisma.Decimal | null;
        categoryId: number;
        sku: string | null;
        price: Prisma.Decimal;
        stockQty: number;
        isInStock: boolean;
        isFeatured: boolean;
        productType: import(".prisma/client").$Enums.ProductType;
        waterType: import(".prisma/client").$Enums.WaterType | null;
        difficulty: import(".prisma/client").$Enums.Difficulty | null;
        sizeCmMin: number | null;
        sizeCmMax: number | null;
        tempCMin: number | null;
        tempCMax: number | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        nameAr: string;
        nameEn: string | null;
        description: string | null;
        isActive: boolean;
        compareAtPrice: Prisma.Decimal | null;
        categoryId: number;
        sku: string | null;
        price: Prisma.Decimal;
        stockQty: number;
        isInStock: boolean;
        isFeatured: boolean;
        productType: import(".prisma/client").$Enums.ProductType;
        waterType: import(".prisma/client").$Enums.WaterType | null;
        difficulty: import(".prisma/client").$Enums.Difficulty | null;
        sizeCmMin: number | null;
        sizeCmMax: number | null;
        tempCMin: number | null;
        tempCMax: number | null;
    }>;
    toggleActive(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        nameAr: string;
        nameEn: string | null;
        description: string | null;
        isActive: boolean;
        compareAtPrice: Prisma.Decimal | null;
        categoryId: number;
        sku: string | null;
        price: Prisma.Decimal;
        stockQty: number;
        isInStock: boolean;
        isFeatured: boolean;
        productType: import(".prisma/client").$Enums.ProductType;
        waterType: import(".prisma/client").$Enums.WaterType | null;
        difficulty: import(".prisma/client").$Enums.Difficulty | null;
        sizeCmMin: number | null;
        sizeCmMax: number | null;
        tempCMin: number | null;
        tempCMax: number | null;
    } | null>;
}
