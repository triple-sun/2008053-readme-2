import { Injectable } from "@nestjs/common";
import { PostError } from "@readme/shared-types";
import { PostRepository } from "../posts/post.repository";
import { CommentEntity } from "./comment.entity";
import { CommentError } from "./comment.enum";
import { CommentRepository } from "./comment.repository";
import { CommentCreateDTO } from "./dto/comment-create.dto";

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postRepository: PostRepository
      ) {}

  async getCommentsForPost(postID: number) {
    return await this.commentRepository.findAllByPostID(postID)
  }

  async createComment(postID: number, dto: CommentCreateDTO) {
    const post = await this.postRepository.findByID(postID)

    if (!post) {
      throw new Error(PostError.NotFound)
    }

    const newComment = new CommentEntity(postID, dto)

    return await this.commentRepository.create(newComment);
  }

  async deleteComment(commentID: number) {
    const comment = await this.commentRepository.findByID(commentID);

    if (!comment) {
      throw new Error(CommentError.NotFound)
    }

    console.log({id: commentID, comment: comment})

    await this.commentRepository.destroy(commentID)
  }
}
