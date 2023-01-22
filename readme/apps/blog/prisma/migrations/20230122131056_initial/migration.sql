/*
  Warnings:

  - You are about to drop the column `text` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `Post` table. All the data in the column will be lost.
  - Added the required column `comment` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "text",
ADD COLUMN     "comment" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "link",
ADD COLUMN     "webLink" TEXT,
ALTER COLUMN "isDraft" DROP NOT NULL,
ALTER COLUMN "isRepost" DROP NOT NULL;
