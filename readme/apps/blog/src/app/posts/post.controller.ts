import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RMQRoute } from 'nestjs-rmq';
import { ContentType } from '@prisma/client';
import { Prefix, Path, Property, User, JwtAuthGuard, RPC, Consumes, UserAuthDTO, PostIDDTO, fillRDOForPost, SearchDTO, FeedDTO, TagDTO, TypeDTO, AuthorIDDTO, PostsQueryDTO, fillDTOForPost, PostUpdateDTO, PostCreateDTO, QueryType, PostsFullQueryDTO } from '@readme/core';

import { PostService } from './post.service';
import { FormDataRequest } from 'nestjs-form-data';

@ApiTags(Prefix.Posts)
@Controller(Prefix.Posts)
export class PostController {
  constructor(
    private readonly postService: PostService,
  ) {}

  @RMQRoute(RPC.GetPost)
  @FormDataRequest()
  async show( {postId}: PostIDDTO ) {
    const post = await this.postService.getPost(postId);

    return post
  }

  @RMQRoute(RPC.GetPosts)
  async getAllPosts(
    @Query() query: PostsQueryDTO
  ) {
    const posts = await this.postService.getPosts(query)

    return posts.map(fillRDOForPost)
  }

  @RMQRoute(RPC.GetFeed)
  async getFeed(dto: PostsFullQueryDTO<FeedDTO>,) {
    const posts = await this.postService.getPosts<FeedDTO>(dto)

    return posts.map(fillRDOForPost)
  }

  @Get(Path.Tag)
  @ApiConsumes(Consumes.FormData)
  @ApiQuery({ type: PostsQueryDTO, name: Property.Query })
  @ApiQuery({ type: TagDTO, name: Property.Tag  })
  async getPostsByTag(
    @Query() tag: TagDTO,
    @Query() query: PostsQueryDTO,
  ) {
    const posts = await this.postService.getPosts<TagDTO>({...query, searchFor: tag})

    return posts.map(fillRDOForPost)
  }

  @Get(Path.Type)
  @ApiConsumes(Consumes.FormData)
  @ApiQuery({ name: Property.Query, type: PostsQueryDTO })
  @ApiQuery({ name: Property.Type, enum: ContentType, type: TypeDTO })
  async getPostsByType(
    @Query() type: TypeDTO,
    @Query() query: PostsQueryDTO,
  ) {
    const posts = await this.postService.getPosts<TypeDTO>({...query, searchFor: type})

    return posts.map(fillRDOForPost)
  }

  @Get(Path.Author)
  @ApiConsumes(Consumes.FormData)
  @ApiQuery({ type: PostsQueryDTO, name: Property.Query })
  @ApiQuery({ type: UserAuthDTO, name: Property.AuthorId })
  async getPostsByAuthor(
    @Query() query: PostsQueryDTO,
    @Query() authorId: AuthorIDDTO,
  ) {
    return (
      await this.postService.getPosts({...query, searchFor: authorId})).map(fillRDOForPost)
  }

  @Get(Path.Search)
  @ApiConsumes(Consumes.FormData)
  @ApiQuery({ type: PostsQueryDTO, name: Property.Query })
  async getPostsByTitle(
    @Query() query: PostsQueryDTO,
    @Query() title: SearchDTO,
  ) {
    const posts = await this.postService.getPosts<SearchDTO>({...query, searchFor: title})

    return posts.map(fillRDOForPost)
  }

  @Get(Path.Drafts)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({ type: PostsQueryDTO })
  async getDrafts(
    @User() user: UserAuthDTO,
    @Query() query: PostsQueryDTO,
  ) {
    const posts = await this.postService.getPosts({...query, searchFor: user, isDraft: true})

    return posts.map(fillRDOForPost)
  }

  @Post(Path.New)
  @UseGuards(JwtAuthGuard)
  @ApiConsumes(Consumes.FormData)
  @ApiBearerAuth()
  @ApiQuery({ type: TypeDTO, enum: ContentType })
  async create(
    @User() user: UserAuthDTO,
    @Body() dto: PostCreateDTO,
  ) {
    const post = await this.postService.createPost(user, fillDTOForPost(dto))

    return fillRDOForPost(post)
  }

  @Patch(Path.Update)
  @UseGuards(JwtAuthGuard)
  @ApiConsumes(Consumes.FormData)
  @ApiBearerAuth()
  @ApiQuery({ type: PostsQueryDTO })
  @ApiQuery({ type: PostIDDTO })
  async update(
    @Query() id: PostIDDTO,
    @User() user: UserAuthDTO,
    @Body() update: PostUpdateDTO,
  ) {
    const post = await this.postService.updatePost(id, user, update);

    return fillRDOForPost(post)
  }

  @Delete(Path.Delete)
  @UseGuards(JwtAuthGuard)
  @ApiConsumes(Consumes.FormData)
  @ApiBearerAuth()
  @ApiQuery({ type: PostsQueryDTO })
  @ApiQuery({ type: PostIDDTO })
  async destroy(
    @Query() query: PostIDDTO,
    @User() user: UserAuthDTO,
  ) {
    await this.postService.deletePost(query, user)
  }

  @Post(Path.Repost)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({ type: PostsQueryDTO })
  @ApiQuery({ type: PostIDDTO })
  async repost(
    @Query() query: PostIDDTO,
    @User() user: UserAuthDTO,
  ) {
    const post = await this.postService.repost(query, user);

    return fillRDOForPost(post)
  }

  @Post(Path.Like)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({ type: PostsQueryDTO })
  @ApiQuery({ type: PostIDDTO })
  async like(
    @Param() query: PostIDDTO,
    @User() user: UserAuthDTO,
  ) {
    const post = await this.postService.likePost(query, user);

    return fillRDOForPost(post)
  }

  @RMQRoute(RPC.GetPosts)
  @ApiOkResponse({type: [Post]})
  async getPostsByUser(
    @User() {userId}: UserAuthDTO,
  ) {
    return await this.postService.getPosts({type: QueryType.Feed, searchFor: { userId }})
  }

  @RMQRoute(RPC.GetNewPosts)
  @ApiOkResponse({type: [Post]})
  async getNewPosts(
    @User() {userId}: UserAuthDTO,
    @Query() since: Date
  ) {
    return await this.postService.getPosts({type: QueryType.Feed, searchFor: { userId }, since: since})
  }
}
