import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.UserCreateInput) {
        const existing = await this.prisma.user.findUnique({ where: { email: data.email } });
        if (existing) throw new ConflictException('Email already exists');

        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Remove id or other unnecessary fields if passed blindly (though types prevent it usually)
        return this.prisma.user.create({
            data: {
                ...data,
                password: hashedPassword,
            }
        });
    }

    async findAll() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
                // Exclude password
            }
        });
    }

    async findOne(id: number) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) throw new NotFoundException('User not found');
        const { password, ...result } = user;
        return result;
    }

    async update(id: number, data: Prisma.UserUpdateInput) {
        if (data.password) {
            if (typeof data.password === 'string') {
                data.password = await bcrypt.hash(data.password, 10);
            }
        }

        try {
            const user = await this.prisma.user.update({
                where: { id },
                data,
            });
            const { password, ...result } = user;
            return result;
        } catch (error) {
            if (error.code === 'P2002') {
                throw new ConflictException('Email already exists');
            }
            throw error;
        }
    }

    async remove(id: number) {
        // Prevent deleting the last admin or yourself could be good, but for now simple delete
        return this.prisma.user.delete({ where: { id } });
    }
}
