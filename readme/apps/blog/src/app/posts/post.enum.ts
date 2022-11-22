export enum PostError {
  Permission = 'You can only edit and delete your own posts',
  NotFound = 'Post not found'
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
  ID = '123',
  Tags = `['tag', 'another tag', 'one more tag', '8 tags max']`,
  Link = 'link@domain.domain',
  Desc = 'really cool link',
  Author = '213553',
  Origin = '562346',
  User = '2l3rgrg2436237fwjkshd'
}
