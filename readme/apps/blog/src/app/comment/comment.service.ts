import { Injectable } from "@nestjs/common";
import { CommentInfo, NotFoundErrorMessage } from "@readme/core";

import { CommentEntity } from "./comment.entity";
import { CommentRepository } from "./comment.repository";
import { CommentCreateDTO } from "./dto/comment-create.dto";
import { CommentListQuery } from "./query/comment-list.query";
import { PostService } from "../posts/post.service";

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postService: PostService
      ) {}

  async getCommentsForPost(query: CommentListQuery) {
    await this.postService.getPost(query.postID)

    return await this.commentRepository.findAllByPostID(query)
  }

  async createComment(postID: number, userID: string, dto: CommentCreateDTO) {
    const newComment = new CommentEntity({postID, userID, ...dto})

    await this.postService.getPost(postID)

    return await this.commentRepository.create(newComment);
  }

  async deleteComment(commentID: number) {
    const comment = await this.commentRepository.findOne(commentID);

    if (!comment) {
      throw new Error(
        NotFoundErrorMessage.CommentNotFoundID(commentID)
      )
    }

    await this.commentRepository.destroy(commentID)

    return CommentInfo.Deleted
  }
}
