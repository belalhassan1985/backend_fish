
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SettingsService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.storeSettings.findMany();
    }

    async findByKey(key: string) {
        return this.prisma.storeSettings.findUnique({
            where: { settingKey: key }
        });
    }

    async upsert(key: string, value: string) {
        return this.prisma.storeSettings.upsert({
            where: { settingKey: key },
            update: { settingValue: value },
            create: { settingKey: key, settingValue: value },
        });
    }
}
