import { Injectable } from "@nestjs/common";
import { CommentMemoryRepository } from "./comment-memory.repository";
import { CommentEntity } from "./comment.entity";
import { CommentError } from "./comment.enum";
import { CommentCreateDTO } from "./dto/comment-create.dto";

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentMemoryRepository,
      ) {}

  async create(comment: CommentCreateDTO) {
    const newComment = new CommentEntity(comment)

    return this.commentRepository.create(newComment);
  }

  async findByID(commentID: string) {
    return this.commentRepository.findByID(commentID);
  }

  async findAllByPostID(postID: string) {
    const index = await this.commentRepository.index()
    console.log(index, postID)

    return index.filter((comment) => comment.postID === postID)
  }

  async delete(commentID: string, userID: string) {
    const comment = await this.commentRepository.findByID(commentID);

    if (!comment) {
      throw new Error(CommentError.NotFound)
    }

    if (comment.userID !== userID) {
      throw new Error(CommentError.Permission)
    }

    return this.commentRepository.destroy(commentID)
  }

  async deleteAllByPostID(postID: string) {
    const comments = await this.findAllByPostID(postID)

    comments.forEach((comment) => this.commentRepository.destroy(comment._id))
  }
}
