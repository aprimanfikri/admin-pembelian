import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
  await prisma.pembelian.deleteMany({});
  await prisma.stock.deleteMany({});
  await prisma.produk.deleteMany({});

  const produkList = [
    'Pensil',
    'Pulpen',
    'Buku',
    'Penghapus',
    'Penggaris',
    'Tipe-X',
    'Map',
    'Kertas HVS',
    'Binder',
    'Spidol',
  ];

  for (const nama of produkList) {
    const produk = await prisma.produk.create({
      data: {
        nama,
        harga: Math.floor(Math.random() * 10000) + 1000,
      },
    });

    await prisma.stock.create({
      data: {
        produkId: produk.id,
        jumlah: 100,
      },
    });
  }

  console.log('✅ Seeding selesai');
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
