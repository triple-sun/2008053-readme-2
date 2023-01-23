import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { AppError, PostCreateDTO, PostError, PostIDDTO, PostsFullQueryDTO, PostUpdateDTO, QueryType, toggleArrElement, UserAuthDTO, UserError, UserIDDTO, FeedDTO} from '@readme/core';
import { IPost } from '@readme/shared-types';

import { PostEntity } from './post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
  ) {}

  async getPosts<T>(query: PostsFullQueryDTO<T>) {
    return await this.postRepository.find<T>(query)
  }

  async getFeed(query: PostsFullQueryDTO<FeedDTO>): Promise<IPost[]> {
    return await this.postRepository.find(query)
  }

  async getPost(postId: number): Promise<IPost> {
    const post = await this.postRepository.findOne(postId);

    if (!post) {
      throw new NotFoundException(PostError.NotFound(postId))
    }

    return post
  }

  async createPost({userId}: UserIDDTO, dto: PostCreateDTO): Promise<IPost> {
    const {tags, content, type} = dto

    const post = {
      ...content,
      type,
      tags,
      userId,
      comments: [],
      likes: [],
    }

    const postEntity = new PostEntity(post)

    return await this.postRepository.create(postEntity);
  }

  async updatePost({postId}: PostIDDTO, {userId}: UserIDDTO, dto: PostUpdateDTO): Promise<IPost> {
    const {publishAt, tags, type, content} = dto
    const post = await this.getPost(postId);

    if (post.userId !== userId) {
      throw new ForbiddenException(UserError.Id.Permission)
    }

    const update = {
      ...post,
      ...content,
      type: type ?? post.type,
      publishAt: publishAt ?? post.publishAt ?? new Date(),
      tags: tags ?? post.tags ?? []
    }

    const updatedEntity = new PostEntity(update)

    const updatedPost = await this.postRepository.update({postId}.postId, updatedEntity)

    return updatedPost
  }

  async deletePost({postId}: PostIDDTO, {userId}: UserIDDTO) {
    const post = await this.getPost(postId);

    if (post.userId !== userId) { throw new ForbiddenException(UserError.Id.Permission)}

    await this.postRepository.destroy(postId)
  }

  async repost({postId}: PostIDDTO, {userId}: UserIDDTO): Promise<IPost> {
    const origin = await this.getPost(postId);
    const reposted = await this.getPosts({type: QueryType.UserId, searchFor: { userId }})

    if ((origin.userId === userId && origin.authorId === userId) || !!reposted.some((repost) => repost.userId === userId)) {
       throw new ConflictException(AppError.TripleRepost)
    }

    const repostEntity = new PostEntity({...origin, id: origin.id, isRepost: true})

    return await this.postRepository.create(repostEntity);
  }

  async likePost({postId}: PostIDDTO, {userId}: UserIDDTO): Promise<IPost> {
    const post = await this.getPost(postId);

    const likes = toggleArrElement(post.likes, userId);

    return await this.postRepository.like(postId, likes)
  }

  async publishPost({postId}: PostIDDTO, {userId}: UserAuthDTO, publishAt?: Date): Promise<IPost> {
    const post = await this.getPost(postId);

    if (post.userId !== userId) {
      throw new ForbiddenException(UserError.Id.Permission)
    }

    return await this.postRepository.publish(post.id, publishAt ?? new Date())
  }
}
