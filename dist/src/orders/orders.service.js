"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let OrdersService = class OrdersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const { customerName, phone, address, note, items } = data;
        if (!items || items.length === 0) {
            throw new common_1.BadRequestException('السلة فارغة');
        }
        let total = 0;
        const orderItemsData = [];
        const messageLines = [];
        const count = await this.prisma.order.count();
        const orderNumber = `2026-${(count + 1).toString().padStart(6, '0')}`;
        for (const item of items) {
            if (item.qty <= 0)
                continue;
            const product = await this.prisma.product.findUnique({ where: { id: item.productId } });
            if (!product)
                throw new common_1.BadRequestException(`Product ${item.productId} not found`);
            if (!product.isActive || !product.isInStock)
                throw new common_1.BadRequestException(`Product ${product.nameAr} not available`);
            const lineTotal = Number(product.price) * item.qty;
            total += lineTotal;
            orderItemsData.push({
                productId: product.id,
                productName: product.nameAr,
                productPrice: product.price,
                qty: item.qty
            });
            messageLines.push(`- ${product.nameAr} × ${item.qty} = ${lineTotal.toLocaleString()} د.ع`);
        }
        const order = await this.prisma.order.create({
            data: {
                orderNumber,
                customerName,
                phone,
                address,
                note,
                total: total,
                status: client_1.OrderStatus.PENDING,
                items: {
                    create: orderItemsData
                }
            },
            include: { items: true }
        });
        const settings = await this.prisma.storeSettings.findUnique({ where: { settingKey: 'whatsapp_number' } });
        const waNumber = settings?.settingValue || process.env.WHATSAPP_PHONE_NUMBER || '9647761671476';
        let msg = `*طلب جديد رقم: ${orderNumber}*\n`;
        msg += `الاسم: ${customerName}\n`;
        msg += `الهاتف: ${phone}\n`;
        msg += `العنوان: ${address || 'غير محدد'}\n`;
        msg += `الطلبات:\n${messageLines.join('\n')}\n`;
        msg += `*المجموع: ${total.toLocaleString()} د.ع*\n`;
        if (note)
            msg += `ملاحظة: ${note}`;
        const encodedMsg = encodeURIComponent(msg);
        const waEnv = process.env.WHATSAPP_PHONE_NUMBER || '9647761671476';
        const whatsappUrl = `https://api.whatsapp.com/send/?phone=${waEnv}&text=${encodedMsg}&type=phone_number&app_absent=0`;
        return {
            orderNumber,
            whatsappNumber: waNumber,
            whatsappMessage: msg,
            whatsappUrl,
            orderId: order.id
        };
    }
    async findAll() {
        return this.prisma.order.findMany({
            include: { items: true },
            orderBy: { createdAt: 'desc' }
        });
    }
    async findOne(id) {
        return this.prisma.order.findUnique({
            where: { id },
            include: { items: true }
        });
    }
    async updateStatus(id, status) {
        return this.prisma.order.update({
            where: { id },
            data: { status }
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map