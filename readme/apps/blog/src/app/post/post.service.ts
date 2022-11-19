import { Injectable } from '@nestjs/common';
import { PostMemoryRepository } from './post-memory.repository';
import { PostCreateDTO } from './dto/post-create.dto';
import { PostUpdateDTO } from './dto/post-update.dto';
import { PostEntity } from './post.entity';
import { PostError } from './post.enum';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostMemoryRepository
      ) {}

  async findAll() {
    return this.postRepository.index()
  }

  async getPost(id: string) {
    return this.postRepository.findByID(id);
  }

  async create(dto: PostCreateDTO) {
    const post = await new PostEntity(dto)

    return this.postRepository.create(post);
  }

  async repost(userID: string, postID: string) {
    const post = await this.postRepository.findByID(postID);

    if (!post) {
      throw new Error(PostError.NotFound)
    }

    const repost = await new PostEntity({...post, userID})

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

    const update = await new PostEntity({...post, ...dto})

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

    this.postRepository.destroy(postID)
  }
}
