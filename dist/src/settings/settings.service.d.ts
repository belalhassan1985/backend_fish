import { PrismaService } from '../prisma/prisma.service';
export declare class SettingsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: number;
        settingKey: string;
        settingValue: string;
    }[]>;
    findByKey(key: string): Promise<{
        id: number;
        settingKey: string;
        settingValue: string;
    } | null>;
    upsert(key: string, value: string): Promise<{
        id: number;
        settingKey: string;
        settingValue: string;
    }>;
}
