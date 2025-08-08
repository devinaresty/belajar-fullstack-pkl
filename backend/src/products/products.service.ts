// backend/src/products/products.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MinioService } from '../minio/minio.service';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private minio: MinioService,    // ← inject MinioService
  ) {}

  /** Ambil semua produk dengan presigned imageUrl */
  async findAll() {
    const products = await this.prisma.product.findMany();

    return Promise.all(
      products.map(async (p) => {
        // Ambil object key dari URL, guaranteed string
        const segments = p.imageUrl.split('/');
        const key = segments[segments.length - 1];  

        // Generate presigned URL lewat MinioService
        const presigned = await this.minio.getPresignedUrl(key);

        return {
          ...p,
          imageUrl: presigned,    // override dengan presigned URL
        };
      }),
    );
  }

  /** Ambil satu produk berdasarkan ID, sertakan presigned imageUrl */
  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    const segments = product.imageUrl.split('/');
    const key = segments[segments.length - 1];

    const presigned = await this.minio.getPresignedUrl(key);
    return {
      ...product,
      imageUrl: presigned,
    };
  }
}
