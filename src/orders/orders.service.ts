import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) { }

  async create(data: any) {
    // Data expected: { customerName, phone, address, note, items: [{ productId, qty }] }
    const { customerName, phone, address, note, items } = data;

    if (!items || items.length === 0) {
      throw new BadRequestException('السلة فارغة');
    }

    let total = 0;
    const orderItemsData = [];
    const messageLines = [];

    // Incrementing logic for Order Number
    const count = await this.prisma.order.count();
    const orderNumber = `2026-${(count + 1).toString().padStart(6, '0')}`;

    // Fetch products
    for (const item of items) {
      if (item.qty <= 0) continue;

      const product = await this.prisma.product.findUnique({ where: { id: item.productId } });
      if (!product) throw new BadRequestException(`Product ${item.productId} not found`);
      if (!product.isActive || !product.isInStock) throw new BadRequestException(`Product ${product.nameAr} not available`);

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

    // Create Order
    const order = await this.prisma.order.create({
      data: {
        orderNumber,
        customerName,
        phone,
        address,
        note,
        total: total,
        status: OrderStatus.PENDING,
        items: {
          create: orderItemsData
        }
      },
      include: { items: true }
    });

    // Generate WhatsApp Message
    const settings = await this.prisma.storeSettings.findUnique({ where: { settingKey: 'whatsapp_number' } });
    const waNumber = settings?.settingValue || process.env.WHATSAPP_PHONE_NUMBER || '9647761671476';

    // Formatting message
    let msg = `*طلب جديد رقم: ${orderNumber}*\n`;
    msg += `الاسم: ${customerName}\n`;
    msg += `الهاتف: ${phone}\n`;
    msg += `العنوان: ${address || 'غير محدد'}\n`;
    msg += `الطلبات:\n${messageLines.join('\n')}\n`;
    msg += `*المجموع: ${total.toLocaleString()} د.ع*\n`;
    if (note) msg += `ملاحظة: ${note}`;

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

  async findOne(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: { items: true }
    });
  }

  async updateStatus(id: number, status: OrderStatus) {
    return this.prisma.order.update({
      where: { id },
      data: { status }
    });
  }
}
