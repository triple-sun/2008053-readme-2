import { forwardRef, Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentRepository } from './comment.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentModel, CommentSchema } from './comment.model';
import { PostModule } from '../posts/post.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CommentModel.name, schema: CommentSchema }
    ]),
    forwardRef(() => PostModule)
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
  exports: [CommentRepository]
})
export class CommentModule {}
