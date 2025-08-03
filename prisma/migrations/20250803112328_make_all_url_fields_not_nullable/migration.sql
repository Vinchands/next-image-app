/*
  Warnings:

  - Made the column `downloadUrl` on table `images` required. This step will fail if there are existing NULL values in that column.
  - Made the column `previewUrl` on table `images` required. This step will fail if there are existing NULL values in that column.
  - Made the column `blurUrl` on table `images` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "images" ALTER COLUMN "downloadUrl" SET NOT NULL,
ALTER COLUMN "previewUrl" SET NOT NULL,
ALTER COLUMN "blurUrl" SET NOT NULL;
