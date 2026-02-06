import { Controller, Post, Body, Param, Delete, ParseIntPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, MediaType } from '@prisma/client';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('media')
export class MediaController {
    constructor(private prisma: PrismaService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './public/uploads',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                cb(null, `${randomName}${extname(file.originalname)}`);
            }
        })
    }))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return {
            url: `/uploads/${file.filename}`,
            filename: file.filename,
            originalName: file.originalname,
        };
    }

    @Post('product/:id')
    async addMedia(@Param('id', ParseIntPipe) productId: number, @Body() data: { url?: string; youtubeVideoId?: string; mediaType: MediaType; title?: string }) {
        return this.prisma.productMedia.create({
            data: {
                productId,
                ...data,
                displayOrder: 99 // default to end
            }
        });
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.prisma.productMedia.delete({ where: { id } });
    }
}
