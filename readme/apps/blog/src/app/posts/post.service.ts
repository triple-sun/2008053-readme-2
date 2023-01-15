import { Injectable } from '@nestjs/common';
import { NotFoundErrorMessage, PostCreateDTO, PostError, PostUpdateDTO, toggleArrElement, UserIDQuery } from '@readme/core';
import { IPost } from '@readme/shared-types';

import { PostEntity } from './post.entity';
import { PostRepository } from './post.repository';
import { PostFeedQuery } from './query/post-feed.query';
import { PostsNotifyQuery } from './query/posts-notify.query';
import { RMQService } from 'nestjs-rmq';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly rmqService: RMQService
  ) {}

  async getPosts(query: PostFeedQuery) {
    const subscriptions = await this.rmqService.send<string, string[]>('rpc-users', query.userID)
    console.log(subscriptions)
    //const posts = await this.postRepository.find(query)

    //return posts
  }

  async getPost(postID: number): Promise<IPost> {
    const post = await this.postRepository.findOne(postID);

    if (!post) {
      throw new Error(
        NotFoundErrorMessage.PostNotFoundID(postID)
      );
    }

    return post
  }

  async createPost({userID}: UserIDQuery, dto: PostCreateDTO) {
    const contentType = dto.type.toLowerCase()

    const post = {
      [contentType]: dto[contentType],
      type: dto.type,
      tags: dto.tags,
      userID,
      comments: [],
      likes: [],
    }

    const postEntity = new PostEntity(post)

    const newPost = await this.postRepository.create(postEntity);

    return newPost
  }

  async updatePost(postID: number, {userID}: UserIDQuery, dto: PostUpdateDTO) {
    const {type, tags, publishAt} = dto
    const post = await this.getPost(postID);

    const contentType = type ? type.toLowerCase() : post.type.toLowerCase()

    if (post.userID !== userID) {
      throw new Error(PostError.Permission)
    }

    const update = {
      ...post,
      ...dto[contentType],
      type,
      publishAt,
      tags
    }

    const updatedEntity = new PostEntity(update)

    const updatedPost = await this.postRepository.update(postID, updatedEntity)

    return updatedPost
  }

  async deletePost(postID: number, userID: string) {
    const post = await this.postRepository.findOne(postID);

    if (!post) {
      throw new Error(PostError.NotFound)
    }

    if (post.userID !== userID) {
      throw new Error(PostError.Permission)
    }

    await this.postRepository.destroy(postID)
  }

  async repost(postID: number, userID: string): Promise<IPost> {
    const origin = await this.getPost(postID);

    if (origin.authorID === userID) {
      throw new Error(PostError.SelfRepost)
    }

    if (origin.userID === userID) {
      throw new Error(PostError.DuplicateRepost)
    }

    const {authorID, ...postBase} = origin

    const repostEntity = new PostEntity({...postBase, isRepost: true, authorID: authorID ?? origin.userID })

    const repost = await this.postRepository.create(repostEntity);

    return {
      ...repost,
    };
  }

  async likePost(postID: number, query: UserIDQuery): Promise<IPost> {
    const post = await this.getPost(postID);

    const likes = toggleArrElement(post.likes, query.userID);

    const updatedPost = await this.postRepository.like(postID, likes)

    return updatedPost
  }

  async publishPost(postID: number, query: UserIDQuery): Promise<IPost> {
    const post = await this.postRepository.findOne(postID);

    if (!post) {
      throw new Error(PostError.NotFound);
    }

    if (post.userID !== query.userID) {
      throw new Error(PostError.Permission)
    }

    if (!post.isDraft) {
      throw new Error(PostError.Published)
    }

    const updatedPost = await this.postRepository.publish(postID)

    return updatedPost
  }

  async notify({email, userID}: PostsNotifyQuery) {
    return await this.getPosts({userID})
  }
}
