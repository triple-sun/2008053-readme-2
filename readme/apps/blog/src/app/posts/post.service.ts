import { ForbiddenException, Injectable } from '@nestjs/common';
import { NotifyDTO, PostCreateDTO, PostError, RPC, toggleArrElement, validatePostUserID, validateRepost } from '@readme/core';
import { IPost, IUser } from '@readme/shared-types';

import { PostEntity } from './post.entity';
import { PostRepository } from './post.repository';
import { RMQService } from 'nestjs-rmq';
import { PostsQuery } from './query/posts.query.dto';
import { ContentType } from '@prisma/client';
import { PostDeleteDTO } from './query/post-delete.dto';
import { PostUpdateDTO } from './query/post-update.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly rmqService: RMQService
  ) {}
  async getPostsByAuthor(query: PostsQuery, authorID: string) {
    return await this.postRepository.find({...query, authorID})
  }

  async getPostsByTag(query: PostsQuery, tag: string) {
    return await this.postRepository.find({...query, tag})
  }

  async getPostsByType(query: PostsQuery, type: ContentType) {
    return await this.postRepository.find({...query, type})
  }

  async getPostsByTitle(query: PostsQuery, title: string) {
    return await this.postRepository.find({...query, title})
  }

  async getDrafts(query: PostsQuery, userID: string) {
    return await this.postRepository.find({...query, authorID: userID, isDraft: true})
  }

  async getPosts(query: PostsQuery) {
    return await this.postRepository.find(query)
  }

  async getFeed(userID: string, query?: PostsQuery) {
    const user = await this.rmqService.send<string, IUser>(RPC.GetSub, userID)
    const subs = [...user.subscriptions.map((sub) => sub.toString()), userID]

    return await this.postRepository.find({...query, subs})
  }

  async getPost(postID: number): Promise<IPost> {
    const post = await this.postRepository.findOne(postID);

    return post
  }

  async createPost(userID: string, dto: PostCreateDTO) {
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

  async updatePost(userID: string, dto: PostUpdateDTO) {
    const {tags, publishAt, postID} = dto
    const post = await this.getPost(postID);
    const type = dto.type ?? post.type

    validatePostUserID(post, userID)

    const update = {
      ...post,
      ...dto[type.toLowerCase()],
      type,
      publishAt,
      tags
    }

    const updatedEntity = new PostEntity(update)

    const updatedPost = await this.postRepository.update(postID, updatedEntity)

    return updatedPost
  }

  async deletePost(userID: string, {postID}: PostDeleteDTO) {
    await this.postRepository.destroy(postID)
  }

  async repost(postID: number, userID: string): Promise<IPost> {
    const origin = await this.getPost(postID);

    validateRepost(origin, userID)

    const repostEntity = new PostEntity({...origin, isRepost: true})

    return await this.postRepository.create(repostEntity);
  }

  async likePost(postID: number, userID: string): Promise<IPost> {
    const post = await this.getPost(postID);

    const likes = toggleArrElement(post.likes, userID);

    return await this.postRepository.like(postID, likes)
  }

  async publishPost(postID: number, userID: string, publishAt?: Date): Promise<IPost> {
    const post = await this.getPost(postID);

    if (post.userID !== userID) {
      throw new ForbiddenException(PostError.Permission)
    }

    return await this.postRepository.publish(postID, publishAt ?? new Date())
  }

  async notify(userID: string) {
    const user = await this.rmqService.send<string, IUser>(RPC.GetUser, userID)
    const posts = await this.getFeed(userID, {since: user.notifiedAt})

    return await this.rmqService.notify<NotifyDTO>(RPC.Notify, {userID, posts})
  }
}
