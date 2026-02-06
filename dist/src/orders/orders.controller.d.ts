import { OrdersService } from './orders.service';
import { OrderStatus } from '@prisma/client';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: any): Promise<{
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
            productPrice: import("@prisma/client/runtime/library").Decimal;
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
        total: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.OrderStatus;
    })[]>;
    findOne(id: number): Promise<({
        items: {
            id: number;
            productId: number;
            productName: string;
            productPrice: import("@prisma/client/runtime/library").Decimal;
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
        total: import("@prisma/client/runtime/library").Decimal;
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
        total: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.OrderStatus;
    }>;
}
