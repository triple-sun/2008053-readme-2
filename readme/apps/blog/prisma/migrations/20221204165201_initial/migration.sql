-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_originID_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "authorID" DROP NOT NULL,
ALTER COLUMN "originID" DROP NOT NULL;
