import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module'; 
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { MinioModule } from './minio/minio.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load .env dan jadikan ConfigService global
    PrismaModule,  // Daftarkan PrismaModule agar PrismaService bisa di-inject ke manapun
    HealthModule, ProductsModule, CartModule, MinioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
