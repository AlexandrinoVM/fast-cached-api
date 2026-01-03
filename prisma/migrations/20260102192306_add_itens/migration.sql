-- CreateTable
CREATE TABLE "itens" (
    "id" SERIAL NOT NULL,
    "id_item" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "itens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "itens_id_item_key" ON "itens"("id_item");

-- CreateIndex
CREATE UNIQUE INDEX "itens_name_key" ON "itens"("name");
