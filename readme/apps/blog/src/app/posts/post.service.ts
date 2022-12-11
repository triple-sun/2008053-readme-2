import { Injectable } from '@nestjs/common';
import { PostEntity } from './post.entity';
import { PostRepository } from './post.repository';
import { PostCreateDTO, PostError } from '@readme/shared-types';
import { formatPostDataForEntity, formatPostForRDO, toggle } from '@readme/core';
import { PostUpdateDTO } from './dto/post-update.dto';
import { PostQuery } from './query/post.query';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
      ) {}

  async getPosts(query: PostQuery) {
    const posts = await this.postRepository.find(query)

    return posts.map((post) => formatPostForRDO(post))
  }

  async getPost(postID: number) {
    const post = await this.postRepository.findByID(postID);

    if (!post) {
      throw new Error(PostError.NotFound);
    }

    return formatPostForRDO(post)
  }

  async createPost(dto: PostCreateDTO) {
    const type = dto.content.type

    const post = {
      type,
      content: {...dto.content},
      tags: [...dto.tags],
      likes: [],
      comments: [],
      isRepost: false,
      userID: dto.userID,
    };

    const postEntity = new PostEntity(post)

    const newPost = await this.postRepository.create(postEntity);

    return formatPostForRDO(newPost)
  }

  async repost(postID: number) {
    const post = await this.postRepository.findByID(postID);

    const authorID = post.authorID ? post.authorID : post.userID
    const originID = post.id


    if (!post) {
      throw new Error(PostError.NotFound)
    }

    const postData = formatPostDataForEntity(post)

    const repostEntity = new PostEntity({...postData, isRepost: true, originID, authorID})

    const repost = await this.postRepository.create(repostEntity);

    return formatPostForRDO(repost);
  }

  async likePost(postID: number, dto: PostUpdateDTO) {
    const post = await this.postRepository.findByID(postID);
    const {userID} = dto

    if (!post) {
      throw new Error(PostError.NotFound);
    }

    const postData = formatPostDataForEntity(post)

    const likes = toggle(postData.likes, userID);

    const updatedEntity = new PostEntity({...postData, likes})

    const updatedPost = await this.postRepository.update(postID, updatedEntity)

    return formatPostForRDO(updatedPost)
  }

  async updatePost(postID: number, dto: PostUpdateDTO) {
    const post = await this.postRepository.findByID(postID);
    const {userID, ...update} = dto

    if (!post) {
      throw new Error(PostError.NotFound);
    }

    if (post.userID !== userID) {
      throw new Error(PostError.Auth)
    }

    const postData = formatPostDataForEntity(post)

    const updatedEntity = new PostEntity({...postData, ...update})

    const updatedPost = await this.postRepository.update(postID, updatedEntity)

    return formatPostForRDO(updatedPost)
  }

  async deletePost(postID: number) {
    const post = await this.postRepository.findByID(postID);

    if (!post) {
      throw new Error(PostError.NotFound)
    }

    await this.postRepository.destroy(postID)
  }
}
