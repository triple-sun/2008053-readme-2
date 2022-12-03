import { Injectable } from '@nestjs/common';
import { PostCreateDTO } from './dto/post-create.dto';
import { PostUpdateDTO } from './dto/post-update.dto';
import { PostEntity } from './post.entity';
import { PostError } from './post.enum';
import { PostRepository } from './post.repository';
import { CommentRepository } from '../comment/comment.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly commentRepository: CommentRepository
      ) {}

  async findAll() {
    return this.postRepository.index()
  }

  async getPost(postID: string) {
    const post = await this.postRepository.findByID(postID);

    if (!post) {
      throw new Error(PostError.NotFound);
    }

    console.log({post: post})
    return post;
  }

  async create(dto: PostCreateDTO) {
    const {contentType, content, tags, isDraft, userID} = dto;
    const post = {
      contentType,
      content,
      tags,
      likes: [],
      comments: [],
      isDraft,
      isRepost: false,
      userID,
    };

    const postEntity = new PostEntity(post)

    console.log({'post': post, entity: postEntity})

    return this.postRepository.create(postEntity);
  }

  async repost(postID: string) {
    const post = await this.postRepository.findByID(postID);

    if (!post) {
      throw new Error(PostError.NotFound)
    }

    const repost = new PostEntity({...post, isRepost: true})

    return await this.postRepository.create(repost);
  }

  async update(postID: string, dto: PostUpdateDTO) {
    const post = await this.postRepository.findByID(postID);
    const { contentType, content, tags, userID } = dto;

    if (!post) {
      throw new Error(PostError.NotFound);
    }

    if (post.userID !== userID) {
      throw new Error(PostError.Auth)
    }

    const postEntity = new PostEntity(post)

    if (contentType && content) {
      await postEntity.updateContent(contentType, content)
    }

    if (tags) {
      await postEntity.updateTags(tags)
    }

    return await this.postRepository.update(postID, postEntity)
  }

  async delete(postID: string) {
    const post = await this.postRepository.findByID(postID);

    if (!post) {
      throw new Error(PostError.NotFound)
    }

    await this.postRepository.destroy(postID)
    await this.commentRepository.destroyAllByPostID(postID)
  }
}
