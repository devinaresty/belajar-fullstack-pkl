import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  /** Tambah atau update item di cart */
  async addToCart(sessionId: string, productId: number, quantity: number) {
    // Cek apakah sudah ada item
    const product = await this.prisma.product.findUniqueOrThrow({
        where: { id: productId },
    });
    const priceAtOrder = product.price;

    const existing = await this.prisma.cartItem.findFirst({
        where: { sessionId, productId },
    });
    if (existing) {
      // update quantity
      return this.prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
      });
    }
    // baru: create
    return this.prisma.cartItem.create({
      data: { sessionId, productId, quantity, priceAtOrder },
    });
  }

  /** Ambil semua item di cart untuk session tertentu */
  getCart(sessionId: string) {
    return this.prisma.cartItem.findMany({
      where: { sessionId },
      include: { product: true },
    });
  }

  /** Hapus satu item dari cart */
  removeItem(id: number) {
    return this.prisma.cartItem.delete({ where: { id } });
  }
}
