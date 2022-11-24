import { Injectable } from '@nestjs/common';
import { PostMemoryRepository } from './post-memory.repository';
import { PostCreateDTO } from './dto/post-create.dto';
import { PostUpdateDTO } from './dto/post-update.dto';
import { PostEntity } from './post.entity';
import { PostError } from './post.enum';
import { CommentService } from '../comment/comment.service';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostMemoryRepository,
    private readonly commentService: CommentService
      ) {}

  async findAll() {
    return this.postRepository.index()
  }

  async getPost(postID: string) {
    return this.postRepository.findByID(postID);
  }

  async create(dto: PostCreateDTO) {
    const post = new PostEntity(dto)

    return this.postRepository.create(post);
  }

  async repost(userID: string, postID: string) {
    const post = await this.postRepository.findByID(postID);

    if (!post) {
      throw new Error(PostError.NotFound)
    }

    if (post.originID === userID) {
      throw new Error(PostError.SelfRepost)
    }

    const repost = new PostEntity({...post, userID, isRepost: true})

    return this.postRepository.create(repost);
  }

  async update(postID: string, userID: string, dto: PostUpdateDTO) {
    const post = await this.postRepository.findByID(postID);

    if (!post) {
      throw new Error(PostError.NotFound)
    }

    if (post.userID !== userID) {
      throw new Error(PostError.Permission)
    }

    const update = new PostEntity({...post, ...dto})

    return this.postRepository.update(postID, update)
  }

  async delete(postID: string, userID: string) {
    const post = await this.postRepository.findByID(postID);

    if (!post) {
      throw new Error(PostError.NotFound)
    }

    if (post.userID !== userID) {
      throw new Error(PostError.Permission)
    }

    await this.postRepository.destroy(postID)
    await this.commentService.deleteAllByPostID(postID)

    return this.postRepository.index()
  }
}
