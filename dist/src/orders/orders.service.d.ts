import { PrismaService } from '../prisma/prisma.service';
import { Prisma, OrderStatus } from '@prisma/client';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
        orderNumber: string;
        whatsappNumber: string;
        whatsappMessage: string;
        whatsappUrl: string;
        orderId: number;
    }>;
    findAll(): Promise<({
        items: {
            id: number;
            productId: number;
            productName: string;
            productPrice: Prisma.Decimal;
            qty: number;
            orderId: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        customerName: string;
        phone: string;
        address: string | null;
        note: string | null;
        orderNumber: string;
        total: Prisma.Decimal;
        status: import(".prisma/client").$Enums.OrderStatus;
    })[]>;
    findOne(id: number): Promise<({
        items: {
            id: number;
            productId: number;
            productName: string;
            productPrice: Prisma.Decimal;
            qty: number;
            orderId: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        customerName: string;
        phone: string;
        address: string | null;
        note: string | null;
        orderNumber: string;
        total: Prisma.Decimal;
        status: import(".prisma/client").$Enums.OrderStatus;
    }) | null>;
    updateStatus(id: number, status: OrderStatus): Promise<{
        id: number;
        createdAt: Date;
        customerName: string;
        phone: string;
        address: string | null;
        note: string | null;
        orderNumber: string;
        total: Prisma.Decimal;
        status: import(".prisma/client").$Enums.OrderStatus;
    }>;
}
