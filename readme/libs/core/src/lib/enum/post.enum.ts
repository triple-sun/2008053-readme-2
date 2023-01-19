export enum SortByType {
  Date = 'createdAt',
  Likes = 'likes',
  Comm = 'comments',
}

export const SortDefault = {
  PostSortBy: SortByType.Date,
}

export enum PostError {
  Auth = 'You are not authorized',
  Permission = 'You can only edit, publish or delete your own posts.',
  NotFound = 'Post not found.',
  SelfRepost = 'You can`t repost your own posts.',
  DuplicateRepost = 'You can`t repost the same post twice',
  Published = 'This post is already published',
  QueryType = 'Wrong type query',
  AuthorID = 'Post author ID is required'
}

export enum PostInfo {
  Found = 'Post found.',
  Loaded = 'Post feed has been successfully loaded.',
  Created = 'Post has been successfully created.',
  Updated = 'Post has been successfully updated.',
  Deleted = 'Post has been successfully deleted.',
  Reposted = 'Post has been reposted successfully.'
}
