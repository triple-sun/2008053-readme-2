import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentModule } from '../comment/comment.module';
import { LinkModel, LinkSchema } from '../../../../../libs/shared-types/src/lib/content/link.model';
import { PhotoModel, PhotoSchema } from '../../../../../libs/shared-types/src/lib/content/photo.model';
import { QuoteModel, QuoteSchema } from '../../../../../libs/shared-types/src/lib/content/quote.model';
import { TextModel, TextSchema } from '../../../../../libs/shared-types/src/lib/content/text.model';
import { PostController } from './post.controller';
import { PostModel, PostSchema } from './post.model';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: PostModel.name,
      schema: PostSchema,
      discriminators: [
        { name: LinkModel.name, schema: LinkSchema },
        { name: PhotoModel.name, schema: PhotoSchema },
        { name: QuoteModel.name, schema: QuoteSchema },
        { name: TextModel.name, schema: TextSchema },
        { name: PhotoModel.name, schema: PhotoSchema },
      ], }
  ])
  ,CommentModule],
  controllers: [PostController],
  providers: [PostService, PostRepository],
  exports: [PostService]
})
export class PostModule {}
