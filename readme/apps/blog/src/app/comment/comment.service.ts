import { Injectable } from "@nestjs/common";

import { CommentEntity } from "./comment.entity";
import { CommentRepository } from "./comment.repository";
import { UserIDDTO, Validate } from "@readme/core";
import { CommentDTO, CommentsDTO } from "../posts/dto/comment.dto";
import { PostIDDTO } from "../posts/dto/post/post.dto";
import { PostRepository } from "../posts/post.repository";

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postRepository: PostRepository
      ) {}

  async getCommentsForPost(dto: CommentsDTO) {
    const post = await this.postRepository.findOne(dto.id)
    Validate.Post.Exists(dto.id, post)

    return await this.commentRepository.findAllByPostID(dto)
  }

  async createComment({id: userID}: UserIDDTO, {id}: PostIDDTO, dto: CommentDTO) {
    const post = await this.postRepository.findOne(id)

    Validate.Post.Exists(id, post)
    const newComment = new CommentEntity({userID,  postID: id, ...dto,})

    return await this.commentRepository.create(newComment);
  }

  async deleteComment(commentID: number, userID: string) {
    const comment = await this.commentRepository.findOne(commentID);

    Validate.Comment.Exists(commentID, comment)
    Validate.Comment.User(comment, userID)

    await this.commentRepository.destroy(commentID)
  }
}
