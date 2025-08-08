// backend/prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Hapus data lama supaya id selalu konsisten
  await prisma.cartItem.deleteMany();
  await prisma.product.deleteMany();

  // 2. Seed data produk
  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Kaos Oversize',
        price: 150000,
        // ➡️ nama objek di MinIO: kaosoversize.jpg (tanpa dash)
        imageUrl: 'http://localhost:9000/product-images/kaosoversize.jpg',
      },
      {
        name: 'Dress Floral',
        price: 250000,
        // ➡️ nama objek di MinIO: dressfloral.jpg
        imageUrl: 'http://localhost:9000/product-images/dressfloral.jpg',
      },
      {
        name: 'Blazer Chic',
        price: 400000,
        // ➡️ nama objek di MinIO: blazerchic.jpg
        imageUrl: 'http://localhost:9000/product-images/blazerchic.jpg',
      },
    ],
  });
  console.log(`Seeded ${products.count} products.`);

  // 3. Seed satu contoh cart item
  //    Asumsikan productId=1 sudah ada dari produk di atas
  const cartItem = await prisma.cartItem.create({
    data: {
      sessionId: 'guest1',
      productId: 1,
      quantity: 2,
      priceAtOrder: 150000,
    },
  });
  console.log(`Seeded cart item with id ${cartItem.id}.`);
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
