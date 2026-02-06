import { PrismaService } from '../prisma/prisma.service';
import { MediaType } from '@prisma/client';
export declare class MediaController {
    private prisma;
    constructor(prisma: PrismaService);
    uploadFile(file: Express.Multer.File): Promise<{
        url: string;
        filename: string;
        originalName: string;
    }>;
    addMedia(productId: number, data: {
        url?: string;
        youtubeVideoId?: string;
        mediaType: MediaType;
        title?: string;
    }): Promise<{
        id: number;
        description: string | null;
        mediaType: import(".prisma/client").$Enums.MediaType;
        url: string | null;
        youtubeVideoId: string | null;
        title: string | null;
        isPrimary: boolean;
        displayOrder: number;
        productId: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        description: string | null;
        mediaType: import(".prisma/client").$Enums.MediaType;
        url: string | null;
        youtubeVideoId: string | null;
        title: string | null;
        isPrimary: boolean;
        displayOrder: number;
        productId: number;
    }>;
}
