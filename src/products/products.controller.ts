import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, ParseBoolPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Prisma, ProductType } from '@prisma/client';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    create(@Body() createProductDto: Prisma.ProductUncheckedCreateInput) {
        return this.productsService.create(createProductDto);
    }

    @Get()
    findAll(
        @Query('page') page?: string,
        @Query('limit') limit?: string,
        @Query('categorySlug') categorySlug?: string,
        @Query('q') q?: string,
        @Query('type') type?: ProductType,
        @Query('featured') featured?: string,
        @Query('tag') tag?: string,
        @Query('sort') sort?: string,
        @Query('order') order?: 'asc' | 'desc',
    ) {
        const baseQuery = { categorySlug, q, type, tag, sort, order, featured: featured === 'true' || featured === '1' };

        if (page) {
            const pageNumber = Math.max(1, Number(page) || 1);
            const limitNumber = Math.min(50, Math.max(1, Number(limit) || 20));
            return this.productsService.findAllPaginated({
                ...baseQuery,
                page: pageNumber,
                limit: limitNumber,
            });
        }

        return this.productsService.findAll({
            ...baseQuery,
            limit: limit ? parseInt(limit) : undefined,
        });
    }

    @Get('id/:id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.findById(id);
    }

    @Get(':slug')
    findOne(@Param('slug') slug: string) {
        return this.productsService.findOne(slug);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: Prisma.ProductUncheckedUpdateInput) {
        return this.productsService.update(id, updateProductDto);
    }

    @Patch(':id/toggle-active')
    toggleActive(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.toggleActive(id);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.remove(id);
    }
}
