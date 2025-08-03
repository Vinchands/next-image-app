/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `images` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "images" ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "downloadUrl" DROP NOT NULL,
ALTER COLUMN "previewUrl" DROP NOT NULL,
ALTER COLUMN "blurUrl" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "images_slug_key" ON "images"("slug");
