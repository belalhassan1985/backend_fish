import { SettingsService } from './settings.service';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    findAll(): Promise<{
        id: number;
        settingKey: string;
        settingValue: string;
    }[]>;
    findByKey(key: string): Promise<{}>;
    upsert(body: {
        key: string;
        value: string;
    }): Promise<{
        id: number;
        settingKey: string;
        settingValue: string;
    }>;
}
