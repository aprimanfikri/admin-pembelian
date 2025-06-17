-- CreateTable
CREATE TABLE "Produk" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "harga" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Stock" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "produkId" INTEGER NOT NULL,
    "jumlah" INTEGER NOT NULL,
    CONSTRAINT "Stock_produkId_fkey" FOREIGN KEY ("produkId") REFERENCES "Produk" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pembelian" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "produkId" INTEGER NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "canceled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Pembelian_produkId_fkey" FOREIGN KEY ("produkId") REFERENCES "Produk" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Stock_produkId_key" ON "Stock"("produkId");
