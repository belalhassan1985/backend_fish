import { ProductsService } from './products.service';
import { Prisma, ProductType } from '@prisma/client';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: Prisma.ProductUncheckedCreateInput): Promise<{
        id: number;
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
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(categorySlug?: string, q?: string, type?: ProductType, featured?: string, tag?: string): Promise<({
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
        createdAt: Date;
        updatedAt: Date;
    })[]>;
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
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
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
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    update(id: number, updateProductDto: Prisma.ProductUncheckedUpdateInput): Promise<{
        id: number;
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
        createdAt: Date;
        updatedAt: Date;
    }>;
    toggleActive(id: number): Promise<{
        id: number;
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
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    remove(id: number): Promise<{
        id: number;
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
        createdAt: Date;
        updatedAt: Date;
    }>;
}
