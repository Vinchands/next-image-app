/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `likes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[imageId]` on the table `likes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,imageId]` on the table `likes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "likes_userId_key" ON "likes"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "likes_imageId_key" ON "likes"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "likes_userId_imageId_key" ON "likes"("userId", "imageId");
