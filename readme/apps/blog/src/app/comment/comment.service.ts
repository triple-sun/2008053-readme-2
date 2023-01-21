import { Injectable } from "@nestjs/common";

import { CommentEntity } from "./comment.entity";
import { CommentRepository } from "./comment.repository";
import { CommentCreateDTO } from "./dto/comment-create.dto";
import { CommentsDTO } from "./query/comments.dto";
import { PostService } from "../posts/post.service";
import { PostIDDTO, Validate } from "@readme/core";
import { UserIDDTO } from "libs/core/src/lib/dto/user-create.dto";

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postService: PostService
      ) {}

  async getCommentsForPost({postID, page}: CommentsDTO) {
    await this.postService.getPost({postID})

    return await this.commentRepository.findAllByPostID({postID, page})
  }

  async createComment({userID}: UserIDDTO, {postID}: PostIDDTO, dto: CommentCreateDTO) {
    const newComment = new CommentEntity({userID,  postID, ...dto,})

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
