import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";

import { CommentEntity } from "./comment.entity";
import { CommentRepository } from "./comment.repository";
import { AppError, CommentError, PostError, UserIDDTO } from "@readme/core";
import { CommentDTO, CommentIDDTO, CommentsDTO } from "../posts/dto/comment.dto";
import { PostIDDTO } from "../posts/dto/post/post.dto";
import { PostRepository } from "../posts/post.repository";

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postRepository: PostRepository
      ) {}

  async getPost(id: number)  {
    const post = await this.postRepository.findOne(id)
    if (!post) {
      throw new NotFoundException(PostError.NotFound(id))
    }
  }
  async getCommentsForPost(dto: CommentsDTO) {
    await this.getPost(dto.id)

    return await this.commentRepository.findAllByPostID(dto)
  }

  async createComment({id: userID}: UserIDDTO, {id}: PostIDDTO, dto: CommentDTO) {
    await this.getPost(id)

    const newComment = new CommentEntity({userID,  postID: id, ...dto,})

    return await this.commentRepository.create(newComment);
  }

  async deleteComment({commentID}: CommentIDDTO, userID: string) {
    const comment = await this.commentRepository.findOne(commentID);

    if (!comment) {
      throw new NotFoundException(CommentError.NotFound(commentID))
    }

    if (comment.userID !== userID) {
      throw new ForbiddenException(AppError.Forbidden)
    }

    await this.commentRepository.destroy(commentID)
  }
}
