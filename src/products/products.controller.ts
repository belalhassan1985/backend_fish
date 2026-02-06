import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, ParseBoolPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Prisma, ProductType } from '@prisma/client';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    @Post()
    create(@Body() createProductDto: Prisma.ProductUncheckedCreateInput) {
        return this.productsService.create(createProductDto);
    }

    @Get()
    findAll(
        @Query('categorySlug') categorySlug?: string,
        @Query('q') q?: string,
        @Query('type') type?: ProductType,
        @Query('featured') featured?: string, // Parse manually or use transform
        @Query('tag') tag?: string,
    ) {
        return this.productsService.findAll({
            categorySlug,
            q,
            type,
            featured: featured === 'true' || featured === '1',
            tag
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
