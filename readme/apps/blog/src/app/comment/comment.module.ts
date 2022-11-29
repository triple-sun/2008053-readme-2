import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentRepository } from './comment.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentModel, CommentSchema } from './comment.model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: CommentModel.name, schema: CommentSchema }
  ])],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
  exports: [CommentService]
})
export class CommentModule {}
