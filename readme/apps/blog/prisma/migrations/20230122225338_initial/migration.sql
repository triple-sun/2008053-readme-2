-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('LINK', 'PHOTO', 'QUOTE', 'TEXT', 'VIDEO');

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "type" "ContentType" NOT NULL,
    "title" TEXT,
    "ann" TEXT,
    "text" TEXT,
    "quote" TEXT,
    "author" TEXT,
    "webLink" TEXT,
    "desc" TEXT,
    "videoLink" TEXT,
    "photoLink" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "likes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isDraft" BOOLEAN DEFAULT false,
    "isRepost" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "authorId" TEXT,
    "originId" INTEGER,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comment" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
