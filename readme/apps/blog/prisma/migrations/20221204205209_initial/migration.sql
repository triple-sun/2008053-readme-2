-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postID_fkey";

-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_id_type_fkey";

-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_id_type_fkey";

-- DropForeignKey
ALTER TABLE "Quote" DROP CONSTRAINT "Quote_id_type_fkey";

-- DropForeignKey
ALTER TABLE "Text" DROP CONSTRAINT "Text_id_type_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_id_type_fkey";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_id_type_fkey" FOREIGN KEY ("id", "type") REFERENCES "Post"("id", "type") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_id_type_fkey" FOREIGN KEY ("id", "type") REFERENCES "Post"("id", "type") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_id_type_fkey" FOREIGN KEY ("id", "type") REFERENCES "Post"("id", "type") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Text" ADD CONSTRAINT "Text_id_type_fkey" FOREIGN KEY ("id", "type") REFERENCES "Post"("id", "type") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_id_type_fkey" FOREIGN KEY ("id", "type") REFERENCES "Post"("id", "type") ON DELETE CASCADE ON UPDATE CASCADE;
