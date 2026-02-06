import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Prisma } from '@prisma/client';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Post()
    create(@Body() createCategoryDto: Prisma.CategoryUncheckedCreateInput) {
        return this.categoriesService.create(createCategoryDto);
    }

    @Get()
    findAll() {
        return this.categoriesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.categoriesService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: Prisma.CategoryUncheckedUpdateInput) {
        console.log(`Updating category ${id}`, updateCategoryDto);
        return this.categoriesService.update(id, updateCategoryDto);
    }

    @Patch(':id/toggle-active')
    toggleActive(@Param('id', ParseIntPipe) id: number) {
        return this.categoriesService.toggleActive(id);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.categoriesService.remove(id);
    }
}
