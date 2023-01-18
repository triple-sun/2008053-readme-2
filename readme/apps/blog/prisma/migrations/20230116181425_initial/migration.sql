/*
  Warnings:

  - You are about to drop the `Link` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Photo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Quote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Text` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Video` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PostToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_postID_fkey";

-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_postID_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_originID_fkey";

-- DropForeignKey
ALTER TABLE "Quote" DROP CONSTRAINT "Quote_postID_fkey";

-- DropForeignKey
ALTER TABLE "Text" DROP CONSTRAINT "Text_postID_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_postID_fkey";

-- DropForeignKey
ALTER TABLE "_PostToTag" DROP CONSTRAINT "_PostToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostToTag" DROP CONSTRAINT "_PostToTag_B_fkey";

-- DropIndex
DROP INDEX "Post_originID_key";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "ann" TEXT,
ADD COLUMN     "author" TEXT,
ADD COLUMN     "desc" TEXT,
ADD COLUMN     "link" TEXT,
ADD COLUMN     "photoLink" TEXT,
ADD COLUMN     "quote" TEXT,
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "text" TEXT,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "videoLink" TEXT;

-- DropTable
DROP TABLE "Link";

-- DropTable
DROP TABLE "Photo";

-- DropTable
DROP TABLE "Quote";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "Text";

-- DropTable
DROP TABLE "Video";

-- DropTable
DROP TABLE "_PostToTag";
