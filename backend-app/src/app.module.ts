import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [
    AuthModule, 
    UsersModule, 
    ProductsModule, 
    CategoriesModule, 
    PrismaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
