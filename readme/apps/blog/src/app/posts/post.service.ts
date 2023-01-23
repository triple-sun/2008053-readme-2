import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ContentType } from '@prisma/client';
import { AppError, AuthorIDDTO, PostError, PostsQueryDTO, RPC, toggleArrElement, UserError, UserIDDTO} from '@readme/core';
import { IPost, IUser } from '@readme/shared-types';

import { PostEntity } from './post.entity';
import { PostRepository } from './post.repository';
import { RMQService } from 'nestjs-rmq';

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

    if (!post) {
      throw new NotFoundException(PostError.NotFound(id))
    }

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

    if (post.userId !== userID) { throw new ForbiddenException(UserError.Id.Permission)}

    const update = {
      ...post,
      ...dto.content,
      type: type ?? post.type,
      publishAt,
      tags: tags ?? post.tags
    }

    const updatedEntity = new PostEntity(update)

    const updatedPost = await this.postRepository.update(postIdDto.id, updatedEntity)

    return updatedPost
  }

  async deletePost(postIdDto: PostIDDTO, {id: userID}: UserIDDTO) {
    const post = await this.getPost(postIdDto);

    if (post.userId !== userID) { throw new ForbiddenException(UserError.Id.Permission)}

    await this.postRepository.destroy(postIdDto.id)
  }

  async repost(param: PostIDDTO, {id: userID}: UserIDDTO): Promise<IPost> {
    const origin = await this.getPost(param);

    if (origin.authorId === userID) { throw new ConflictException(AppError.SelfRepost)}
    if (origin.userId === userID) { throw new ConflictException(AppError.DuplicateRepost)}

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

    if (post.userId !== userID) { throw new ForbiddenException(UserError.Id.Permission)}

    return await this.postRepository.publish(param.id, publishAt ?? new Date())
  }
}
