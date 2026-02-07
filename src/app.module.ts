import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { MediaModule } from './media/media.module';
import { SettingsModule } from './settings/settings.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    PrismaModule, CategoriesModule, ProductsModule, OrdersModule, MediaModule, AuthModule, SettingsModule, UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
