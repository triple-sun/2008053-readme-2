import { Injectable } from "@nestjs/common";
import { PostError } from "../posts/post.enum";
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

  async create(dto: CommentCreateDTO) {
    const post = await this.postRepository.exists(dto.postID)

    if (!post) {
      throw new Error(PostError.NotFound)
    }

    const newComment = new CommentEntity(dto)

    return this.commentRepository.create(newComment);
  }

  async findByID(commentID: string) {
    return this.commentRepository.findByID(commentID);
  }

  async findAllByPostID(postID: string) {
    return await this.commentRepository.findAllByPostID(postID)
  }

  async delete(commentID: string) {
    const comment = await this.commentRepository.findByID(commentID);

    if (!comment) {
      throw new Error(CommentError.NotFound)
    }

    console.log({id: commentID, comment: comment})

    await this.commentRepository.destroy(commentID)
  }

  async deleteAllByPostID(postID: string) {
    const comments = await this.findAllByPostID(postID)

    comments.forEach(async (comment) => await this.commentRepository.destroy(comment._id))
  }
}
