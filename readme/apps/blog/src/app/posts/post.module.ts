import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Link, LinkSchema, Photo, PhotoSchema, Quote, QuoteSchema, Text, TextSchema } from '@readme/shared-types';
import { CommentModule } from '../comment/comment.module';
import { PostController } from './post.controller';
import { PostModel, PostSchema } from './post.model';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PostModel.name,
        schema: PostSchema,
        discriminators: [
          { name: Link.name, schema: LinkSchema },
          { name: Photo.name, schema: PhotoSchema },
          { name: Quote.name, schema: QuoteSchema },
          { name: Text.name, schema: TextSchema },
          { name: Photo.name, schema: PhotoSchema },
        ],
      }
  ]),
  forwardRef(() => CommentModule)
  ],
  controllers: [PostController],
  providers: [PostService, PostRepository],
  exports: [PostRepository]
})
export class PostModule {}
