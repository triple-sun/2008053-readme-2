import { ForbiddenException, Injectable } from '@nestjs/common';
import { fillPostRDO, NotifyDTO, PostCreateDTO, PostError, RPC, toggleArrElement, validatePostExists, validatePostUserID, validateRepost } from '@readme/core';
import { IPost, IUser } from '@readme/shared-types';

import { PostEntity } from './post.entity';
import { PostRepository } from './post.repository';
import { RMQService } from 'nestjs-rmq';
import { PostsQuery } from './query/posts.query.dto';
import { ContentType } from '@prisma/client';
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

  async getPostsByUser(userID: string, query?: PostsQuery) {
    return await this.postRepository.find({...query, userID})
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
    const user = await this.rmqService.send<string, IUser>(RPC.GetUser, userID)
    const subs = [...user.subscriptions.map((sub) => sub.toString()), userID]

    return await this.postRepository.find({...query, subs})
  }

  async getPost(postID: number): Promise<IPost> {
    const post = await this.postRepository.findOne(postID);

    validatePostExists(post, postID)

    return post
  }

  async createPost(userID: string, dto: PostCreateDTO) {
    const {tags, type} = dto
    const content = dto.photo ? {photoLink: dto.photo} : dto[type.toLowerCase()]

    const post = {
      ...content,
      type,
      tags,
      userID,
      comments: [],
      likes: [],
    }

    const postEntity = new PostEntity(post)

    return await this.postRepository.create(postEntity);
  }

  async updatePost(userID: string, postID: number, dto: PostUpdateDTO) {
    const {publishAt, tags} = dto
    const post = await this.getPost(postID);

    validatePostExists(post, postID)
    validatePostUserID(post, userID)

    const update = {
      ...post,
      ...dto[dto.type.toLowerCase()],
      type: dto.type ?? post.type,
      publishAt,
      tags: tags ?? post.tags
    }

    console.log({update})
    const updatedEntity = new PostEntity(update)

    const updatedPost = await this.postRepository.update(postID, updatedEntity)

    console.log({updatedPost})
    return updatedPost
  }

  async deletePost(userID: string, postID: number) {
    const post = await this.getPost(postID);

    validatePostExists(post, postID)
    validatePostUserID(post, userID)

    await this.postRepository.destroy(postID)
  }

  async repost(postID: number, userID: string): Promise<IPost> {
    const origin = await this.getPost(postID);

    validateRepost(origin, userID)

    const repostEntity = new PostEntity({...origin, id: origin.id, isRepost: true})

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

    const subs = [...new Set([...user.subscriptions.map((sub) => sub.toString()), userID])]

    const posts = (await this.postRepository.find({subs, since: user.notifiedAt})).map((post) => fillPostRDO(post))

    return await this.rmqService.notify<NotifyDTO>(RPC.Notify, {userID, posts})
      .then(() => this.rmqService.notify<string>(RPC.Notified, userID))
  }
}
