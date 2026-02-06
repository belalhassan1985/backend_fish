import { CategoriesService } from './categories.service';
import { Prisma } from '@prisma/client';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: Prisma.CategoryUncheckedCreateInput): Promise<{
        id: number;
        slug: string;
        parentId: number | null;
        nameAr: string;
        nameEn: string | null;
        description: string | null;
        imageUrl: string | null;
        sortOrder: number;
        isActive: boolean;
    }>;
    findAll(): Promise<({
        children: ({
            children: {
                id: number;
                slug: string;
                parentId: number | null;
                nameAr: string;
                nameEn: string | null;
                description: string | null;
                imageUrl: string | null;
                sortOrder: number;
                isActive: boolean;
            }[];
        } & {
            id: number;
            slug: string;
            parentId: number | null;
            nameAr: string;
            nameEn: string | null;
            description: string | null;
            imageUrl: string | null;
            sortOrder: number;
            isActive: boolean;
        })[];
    } & {
        id: number;
        slug: string;
        parentId: number | null;
        nameAr: string;
        nameEn: string | null;
        description: string | null;
        imageUrl: string | null;
        sortOrder: number;
        isActive: boolean;
    })[]>;
    findOne(id: number): Promise<({
        children: {
            id: number;
            slug: string;
            parentId: number | null;
            nameAr: string;
            nameEn: string | null;
            description: string | null;
            imageUrl: string | null;
            sortOrder: number;
            isActive: boolean;
        }[];
    } & {
        id: number;
        slug: string;
        parentId: number | null;
        nameAr: string;
        nameEn: string | null;
        description: string | null;
        imageUrl: string | null;
        sortOrder: number;
        isActive: boolean;
    }) | null>;
    update(id: number, updateCategoryDto: Prisma.CategoryUncheckedUpdateInput): Promise<{
        id: number;
        slug: string;
        parentId: number | null;
        nameAr: string;
        nameEn: string | null;
        description: string | null;
        imageUrl: string | null;
        sortOrder: number;
        isActive: boolean;
    }>;
    toggleActive(id: number): Promise<{
        id: number;
        slug: string;
        parentId: number | null;
        nameAr: string;
        nameEn: string | null;
        description: string | null;
        imageUrl: string | null;
        sortOrder: number;
        isActive: boolean;
    } | null>;
    remove(id: number): Promise<{
        id: number;
        slug: string;
        parentId: number | null;
        nameAr: string;
        nameEn: string | null;
        description: string | null;
        imageUrl: string | null;
        sortOrder: number;
        isActive: boolean;
    }>;
}
