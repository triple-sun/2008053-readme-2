import { Injectable } from '@nestjs/common';
import { PostEntity } from './post.entity';
import { PostRepository } from './post.repository';
import { CommentRepository } from '../comment/comment.repository';
import { PostCreateDTO, PostError } from '@readme/shared-types';
import { formatPostDataForRepost, formatPostForRDO } from '@readme/core';
import { PostUpdateDTO } from './dto/post-update.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly commentRepository: CommentRepository
      ) {}

  async getPosts() {
    const posts = await this.postRepository.find()

    console.log(posts)

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
      tags: [],
      likes: [],
      comments: [],
      isRepost: false,
      userID: dto.userID,
    };

    const postEntity = new PostEntity(post)

    const newPost = await this.postRepository.create(postEntity);
    console.log(newPost);

    return formatPostForRDO(newPost)
  }

  async repost(postID: number) {
    const post = await this.postRepository.findByID(postID);

    const authorID = post.authorID ? post.authorID : post.userID
    const originID = post.id


    if (!post) {
      throw new Error(PostError.NotFound)
    }

    const postData = formatPostDataForRepost(post)

    const repostEntity = new PostEntity({...postData, isRepost: true, originID, authorID})

    const repost = await this.postRepository.create(repostEntity);

    return formatPostForRDO(repost);
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

    const updatedEntity = new PostEntity({...post, ...update})

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
