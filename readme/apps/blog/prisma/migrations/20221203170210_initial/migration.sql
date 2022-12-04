-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('LINK', 'PHOTO', 'QUOTE', 'TEXT', 'VIDEO');

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "type" "ContentType" NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "likes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isDraft" BOOLEAN NOT NULL DEFAULT false,
    "isRepost" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userID" TEXT NOT NULL,
    "authorID" TEXT NOT NULL,
    "originID" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postID" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Link" (
    "id" INTEGER NOT NULL,
    "type" "ContentType" NOT NULL DEFAULT 'LINK',
    "url" TEXT NOT NULL,
    "desc" TEXT,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" INTEGER NOT NULL,
    "type" "ContentType" NOT NULL DEFAULT 'PHOTO',
    "photo" TEXT NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quote" (
    "id" INTEGER NOT NULL,
    "type" "ContentType" NOT NULL DEFAULT 'QUOTE',
    "quote" TEXT NOT NULL,
    "author" TEXT NOT NULL,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Text" (
    "id" INTEGER NOT NULL,
    "type" "ContentType" NOT NULL DEFAULT 'TEXT',
    "title" TEXT NOT NULL,
    "ann" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Text_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" INTEGER NOT NULL,
    "type" "ContentType" NOT NULL DEFAULT 'VIDEO',
    "title" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_id_type_key" ON "Post"("id", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Link_id_type_key" ON "Link"("id", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Photo_id_type_key" ON "Photo"("id", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Quote_id_type_key" ON "Quote"("id", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Text_id_type_key" ON "Text"("id", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Video_id_type_key" ON "Video"("id", "type");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_originID_fkey" FOREIGN KEY ("originID") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_id_type_fkey" FOREIGN KEY ("id", "type") REFERENCES "Post"("id", "type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_id_type_fkey" FOREIGN KEY ("id", "type") REFERENCES "Post"("id", "type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_id_type_fkey" FOREIGN KEY ("id", "type") REFERENCES "Post"("id", "type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Text" ADD CONSTRAINT "Text_id_type_fkey" FOREIGN KEY ("id", "type") REFERENCES "Post"("id", "type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_id_type_fkey" FOREIGN KEY ("id", "type") REFERENCES "Post"("id", "type") ON DELETE RESTRICT ON UPDATE CASCADE;
