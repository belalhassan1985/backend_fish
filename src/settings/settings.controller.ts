
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) { }

    @Get()
    findAll() {
        return this.settingsService.findAll();
    }

    @Get(':key')
    async findByKey(@Param('key') key: string) {
        const result = await this.settingsService.findByKey(key);
        return result || {};
    }

    @Post()
    upsert(@Body() body: { key: string; value: string }) {
        return this.settingsService.upsert(body.key, body.value);
    }
}
