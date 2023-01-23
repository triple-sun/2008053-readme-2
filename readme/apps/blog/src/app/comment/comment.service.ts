import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";

import { CommentEntity } from "./comment.entity";
import { CommentRepository } from "./comment.repository";
import { AppError, CommentError, CommentsDTO, PostError, PostIDDTO, UserIDDTO, UserAuthDTO, CommentCreateDTO, CommentIDDTO } from "@readme/core";
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
    await this.getPost(dto.postId)

    return await this.commentRepository.findAllByPostID(dto)
  }

  async createComment({userId}: UserIDDTO, {postId}: PostIDDTO, dto: CommentCreateDTO) {
    await this.getPost(postId)

    const newComment = new CommentEntity({userId,  postId, ...dto,})

    return await this.commentRepository.create(newComment)
  }

  async deleteComment({commentId}: CommentIDDTO, user: UserAuthDTO ) {
    const comment = await this.commentRepository.findOne(commentId);

    if (!comment) {
      throw new NotFoundException(CommentError.NotFound(commentId))
    }

    if (comment.userId !== user.userId.toString()) {
      throw new ForbiddenException(AppError.Forbidden)
    }

    await this.commentRepository.destroy(commentId)
  }
}
