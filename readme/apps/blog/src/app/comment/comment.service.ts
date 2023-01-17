import { Injectable } from "@nestjs/common";
import { validateCommentExists, validateCommentUserID } from "@readme/core";

import { CommentEntity } from "./comment.entity";
import { CommentRepository } from "./comment.repository";
import { CommentCreateDTO } from "./dto/comment-create.dto";
import { CommentListQuery } from "./query/comment-list.query";
import { PostService } from "../posts/post.service";
import { CommentCreateQuery } from "./query/comment-create.query";

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

  async createComment(userID: string, query: CommentCreateQuery, dto: CommentCreateDTO) {
    const newComment = new CommentEntity({userID, ...dto, ...query})

    await this.postService.getPost(query.postID)

    return await this.commentRepository.create(newComment);
  }

  async deleteComment(commentID: number, userID: string) {
    const comment = await this.commentRepository.findOne(commentID);

    validateCommentExists(commentID, comment)
    validateCommentUserID(comment, userID)

    await this.commentRepository.destroy(commentID)
  }
}
