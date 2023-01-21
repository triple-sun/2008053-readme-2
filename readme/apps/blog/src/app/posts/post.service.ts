import { Injectable } from '@nestjs/common';
import { PostRDO, PostsDTO, PostCreateDTO, PostIDDTO, PostTypeDTO, RPC, TitleDTO, toggleArrElement, NameDTO, Validate, fillObject, AuthorIDDTO, TagDTO} from '@readme/core';
import { IPost, IUser } from '@readme/shared-types';

import { PostEntity } from './post.entity';
import { PostRepository } from './post.repository';
import { RMQService } from 'nestjs-rmq';
import { PostsQueryDTO } from './query/posts.query.dto';
import { ContentType } from '@prisma/client';
import { PostUpdateDTO } from './query/post-update.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly rmqService: RMQService
  ) {}

  async getPostsByAuthor({authorID}: AuthorIDDTO, query?: PostsQueryDTO) {
    return await this.postRepository.find({...query, authorID})
  }

  async getPostsByUser({userID}: NameDTO, query?: PostsQueryDTO): Promise<IPost[]> {
    return await this.postRepository.find({...query, userID})
  }

  async getPostsByTag({tag}: TagDTO, query?: PostsQueryDTO): Promise<IPost[]> {
    return await this.postRepository.find({...query, tag})
  }

  async getPostsByType({type}: PostTypeDTO, query?: PostsQueryDTO): Promise<IPost[]> {
    return await this.postRepository.find({...query, type})
  }

  async getPostsByTitle({title}: TitleDTO, query?: PostsQueryDTO): Promise<IPost[]> {
    return await this.postRepository.find({...query, title})
  }

  async getDrafts({userID}: NameDTO, query?: PostsQueryDTO): Promise<IPost[]> {
    return await this.postRepository.find({...query, authorID: userID, isDraft: true})
  }

  async getPosts(query?: PostsQueryDTO): Promise<IPost[]> {
    return await this.postRepository.find(query)
  }

  async getFeed({userID}: NameDTO, query?: PostsQueryDTO): Promise<IPost[]> {
    const user = await this.rmqService.send<string, IUser>(RPC.GetUser, userID)
    const subs = [...user.subscriptions.map((sub) => sub.toString()), userID]

    return await this.postRepository.find({...query, subs})
  }

  async getPost({postID}: PostIDDTO): Promise<IPost> {
    const post = await this.postRepository.findOne(postID);

    Validate.Post.Exists(postID, post)

    return post
  }

  async createPost({userID}: NameDTO, {type}: PostTypeDTO, dto: PostCreateDTO): Promise<IPost> {
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

  async updatePost(param: PostIDDTO, {userID}: NameDTO,  dto: PostUpdateDTO, type?: ContentType): Promise<IPost> {
    const {publishAt, tags} = dto
    const post = await this.getPost(param);

    Validate.Post.User(post, userID)

    const update = {
      ...post,
      ...dto.content,
      type: type ?? post.type,
      publishAt,
      tags: tags ?? post.tags
    }

    const updatedEntity = new PostEntity(update)

    const updatedPost = await this.postRepository.update(param.postID, updatedEntity)

    console.log({updatedPost})
    return updatedPost
  }

  async deletePost(param: PostIDDTO, {userID}: NameDTO) {
    const post = await this.getPost(param);

    Validate.Post.User(post, userID)

    await this.postRepository.destroy(param.postID)
  }

  async repost(param: PostIDDTO, {userID}: NameDTO): Promise<IPost> {
    const origin = await this.getPost(param);

    Validate.Post.Repost(origin, userID)

    const repostEntity = new PostEntity({...origin, id: origin.id, isRepost: true})

    return await this.postRepository.create(repostEntity);
  }

  async likePost(param: PostIDDTO, {userID}: NameDTO): Promise<IPost> {
    const post = await this.getPost(param);

    const likes = toggleArrElement(post.likes, userID);

    return await this.postRepository.like(param.postID, likes)
  }

  async publishPost(param: PostIDDTO, {userID}: NameDTO, publishAt?: Date): Promise<IPost> {
    const post = await this.getPost(param);

    Validate.Post.User(post, userID)

    return await this.postRepository.publish(param.postID, publishAt ?? new Date())
  }

  async notify({userID}: NameDTO) {
    const user = await this.rmqService.send<string, IUser>(RPC.GetUser, userID)

    const subs = [...new Set([...user.subscriptions.map((sub) => sub.toString()), userID])]

    const posts = (await this.postRepository.find({subs, since: user.notifiedAt})).map((post) => fillObject(PostRDO, post))

    const dto: PostsDTO = {email: user.email, posts, userID}

    return await this.rmqService.notify<PostsDTO>(RPC.Notify, dto)
      .then(() => this.rmqService.notify<string>(RPC.Notified, userID))
  }
}
