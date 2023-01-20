import { Injectable } from "@nestjs/common";

import { CommentEntity } from "./comment.entity";
import { CommentRepository } from "./comment.repository";
import { CommentCreateDTO } from "./dto/comment-create.dto";
import { CommentListQuery } from "./query/comment-list.query";
import { PostService } from "../posts/post.service";
import { CommentCreateQuery } from "./query/comment-create.query";
import { UserDTO, Validate } from "@readme/core";

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postService: PostService
      ) {}

  async getCommentsForPost({postID, page}: CommentListQuery) {
    await this.postService.getPost({postID})

    return await this.commentRepository.findAllByPostID({postID, page})
  }

  async createComment({userID}: UserDTO, query: CommentCreateQuery, dto: CommentCreateDTO) {
    const { postID } = query
    const newComment = new CommentEntity({userID, ...dto, ...query})

    await this.postService.getPost({postID})

    return await this.commentRepository.create(newComment);
  }

  async deleteComment(commentID: number, userID: string) {
    const comment = await this.commentRepository.findOne(commentID);

    Validate.Comment.Exists(commentID, comment)
    Validate.Comment.User(comment, userID)

    await this.commentRepository.destroy(commentID)
  }
}
