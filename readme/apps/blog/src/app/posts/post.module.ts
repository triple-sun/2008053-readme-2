import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentModule } from '../comment/comment.module';
import { PostController } from './post.controller';
import { PostModel, PostSchema } from './post.model';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: PostModel.name, schema: PostSchema }
  ])
  ,CommentModule],
  controllers: [PostController],
  providers: [PostService, PostRepository],
  exports: [PostService]
})
export class PostModule {}
