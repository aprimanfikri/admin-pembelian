import express, { type Request, type Response } from 'express';
import { prisma } from '../lib/db';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const produk = await prisma.produk.findMany({ include: { stok: true } });
  const pembelian = await prisma.pembelian.findMany({
    include: { produk: true },
  });
  res.render('index', { produk, pembelian });
});

router.post('/beli', async (req: Request, res: Response) => {
  const produkId = Number(req.body.produkId);
  const jumlah = Number(req.body.jumlah);
  const stok = await prisma.stock.findUnique({ where: { produkId } });
  if (stok && stok.jumlah >= jumlah) {
    await prisma.pembelian.create({ data: { produkId, jumlah } });
    await prisma.stock.update({
      where: { produkId },
      data: { jumlah: stok.jumlah - jumlah },
    });
  }
  res.redirect('/');
});

router.post('/cancel/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const pembelian = await prisma.pembelian.findUnique({ where: { id } });
  if (pembelian && !pembelian.canceled) {
    await prisma.pembelian.update({ where: { id }, data: { canceled: true } });
    await prisma.stock.update({
      where: { produkId: pembelian.produkId },
      data: { jumlah: { increment: pembelian.jumlah } },
    });
  }
  res.redirect('/');
});

export default router;
