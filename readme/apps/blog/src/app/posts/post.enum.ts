export enum PostError {
  Auth = 'You are not authorized',
  Permission = 'You can only edit and delete your own posts.',
  NotFound = 'Post not found.',
  SelfRepost = 'You cannot repost your own posts.'
}

export enum PostInfo {
  Found = 'Post found.',
  Loaded = 'Post feed has been successfully loaded.',
  Created = 'Post has been successfully created.',
  Updated = 'Post has been successfully updated.',
  Deleted = 'Post has been successfully deleted.',
  Reposted = 'Post has been reposted successfully.'
}

export enum APIDesc {
  Type = 'Post content type',
  Content = 'Post content',
  ID = 'Unique post ID',
  Feed = 'Post feed',
  Tags = 'Post tags',
  Draft = 'This post is a draft',
  Repost = 'This post is a repost',
  AuthorID = 'Original post author ID',
  OriginID = 'Original post ID',
  UserID = 'Unique poster ID'
}

export enum APIExample {
  Bool = 'true',
  Feed = '[{post}, {post, {post}]',
  Type = 'video',
  ID = '496d3bcd-078a-4ade-94c7-7725921a813d',
  Tags = `['tag', 'another tag', 'one more tag', '8 tags max']`,
  Link = 'link@domain.domain',
  Desc = 'really cool link',
}
