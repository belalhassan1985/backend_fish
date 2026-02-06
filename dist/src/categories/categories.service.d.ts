import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.CategoryUncheckedCreateInput): Promise<{
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
    update(id: number, data: Prisma.CategoryUncheckedUpdateInput): Promise<{
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
}
