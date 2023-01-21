import { Injectable } from '@nestjs/common';
import { ContentType, Post } from '@prisma/client';
import { RPC, toggleArrElement, Validate, UserIDDTO, UserRDO} from '@readme/core';
import { IPost, IUser } from '@readme/shared-types';

import { PostEntity } from './post.entity';
import { PostRepository } from './post.repository';
import { RMQService } from 'nestjs-rmq';
import { PostsQueryDTO } from './query/posts.query.dto';
import { AuthorIDDTO, PostCreateDTO, PostIDDTO, TagDTO, TypeDTO, PostUpdateDTO } from './dto/post/post.dto';
import { TitleDTO } from './dto/content/title.dto';
import { NotifyDTO } from '../../../../../libs/core/src/lib/dto/notify.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly rmqService: RMQService
  ) {}

  async getPostsByAuthor(authorID: AuthorIDDTO, query?: PostsQueryDTO) {
    return await this.postRepository.find({...query, searchFor: authorID})
  }

  async getPostsByUser(userID: UserIDDTO, query?: PostsQueryDTO): Promise<IPost[]> {
    return await this.postRepository.find({...query, searchFor: userID})
  }

  async getPostsByTag(tag: TagDTO, query?: PostsQueryDTO): Promise<IPost[]> {
    return await this.postRepository.find({...query, searchFor: tag})
  }

  async getPostsByType(type: TypeDTO, query?: PostsQueryDTO): Promise<IPost[]> {
    return await this.postRepository.find({...query, searchFor: type})
  }

  async getPostsByTitle(title: TitleDTO, query?: PostsQueryDTO): Promise<IPost[]> {
    return await this.postRepository.find({...query, searchFor: title})
  }

  async getDrafts(userID: UserIDDTO, query?: PostsQueryDTO): Promise<IPost[]> {
    return await this.postRepository.find({...query, searchFor: userID, isDraft: true})
  }

  async getPosts(query?: PostsQueryDTO): Promise<IPost[]> {
    return await this.postRepository.find(query)
  }

  async getFeed({id: userID}: UserIDDTO, query?: PostsQueryDTO): Promise<IPost[]> {
    const user = await this.rmqService.send<string, IUser>(RPC.GetUser, userID)
    const subs = [...user.subscriptions.map((sub) => sub.toString()), userID]

    return await this.postRepository.find({...query, searchFor: {subs}})
  }

  async getPost({id}: PostIDDTO): Promise<IPost> {
    const post = await this.postRepository.findOne(id);

    Validate.Post.Exists(id, post)

    return post
  }

  async createPost({id: userID}: UserIDDTO, {type}: TypeDTO, dto: PostCreateDTO): Promise<IPost> {
    const {tags, content} = dto

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

  async updatePost(postIdDto: PostIDDTO, {id: userID}: UserIDDTO,  dto: PostUpdateDTO, type?: ContentType): Promise<IPost> {
    const {publishAt, tags} = dto
    const post = await this.getPost(postIdDto);

    Validate.Post.User(post, userID)

    const update = {
      ...post,
      ...dto.content,
      type: type ?? post.type,
      publishAt,
      tags: tags ?? post.tags
    }

    const updatedEntity = new PostEntity(update)

    const updatedPost = await this.postRepository.update(postIdDto.id, updatedEntity)

    console.log({updatedPost})
    return updatedPost
  }

  async deletePost(postIdDto: PostIDDTO, {id: userID}: UserIDDTO) {
    const post = await this.getPost(postIdDto);

    Validate.Post.User(post, userID)

    await this.postRepository.destroy(postIdDto.id)
  }

  async repost(param: PostIDDTO, {id: userID}: UserIDDTO): Promise<IPost> {
    const origin = await this.getPost(param);

    Validate.Post.Repost(origin, userID)

    const repostEntity = new PostEntity({...origin, id: origin.id, isRepost: true})

    return await this.postRepository.create(repostEntity);
  }

  async likePost(postDto: PostIDDTO, {id: userID}: UserIDDTO): Promise<IPost> {
    const post = await this.getPost(postDto);

    const likes = toggleArrElement(post.likes, userID);

    return await this.postRepository.like(postDto.id, likes)
  }

  async publishPost(param: PostIDDTO, {id: userID}: UserIDDTO, publishAt?: Date): Promise<IPost> {
    const post = await this.getPost(param);

    Validate.Post.User(post, userID)

    return await this.postRepository.publish(param.id, publishAt ?? new Date())
  }

  async notify(dto: UserIDDTO) {
    const {email, name, id, subscriptions, notifiedAt} = await this.rmqService.send<string, UserRDO>(RPC.GetUser, dto.id)

    const subs: string[] = [...new Set([...subscriptions.map((sub) => sub.toString()), id])]

    const posts = await this.postRepository.find({searchFor: {subs}, since: notifiedAt})

    return await this.rmqService.notify<NotifyDTO>(RPC.Notify, {email, name, posts})
      .then(() => this.rmqService.notify<UserIDDTO>(RPC.Notified, {id}))
  }
}
