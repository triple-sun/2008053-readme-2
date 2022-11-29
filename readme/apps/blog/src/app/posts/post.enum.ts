import { LinkModel } from "../../../../../libs/shared-types/src/lib/content/link.model";

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
  ID = 'Unique post ID',
  Feed = 'Post feed',
  Tags = 'Post tags',
  Draft = 'This post is a draft',
  Repost = 'This post is a repost',
  AuthorID = 'Original post author ID',
  OriginID = 'Original post ID',
  UserID = 'Unique poster ID',
  Content = 'Post content',
  Link = 'Post link',
  Desc = 'Link description',
  Title = 'Post title',
  Ann = 'Post announcement',
  Text = 'Post text',
  Quote = 'Post quote',
  Author = 'Post quote author',
  Photo = 'Post photo url',
  Video = 'Post video url'
}

export enum APIExample {
  Bool = 'true',
  Feed = '[{post}, {post, {post}]',
  Type = 'video',
  ID = '496d3bcd-078a-4ade-94c7-7725921a813d',
  Tags = `['tag', 'another tag', 'one more tag', '8 tags max']`,
  Link = 'link@domain.domain',
  Desc = 'really cool link',
  Title = 'nice post',
  Ann = 'Lorem ipsum dolor sit amet.',
  Text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada.',
  Quote = 'Lorem ipsum dolor sit amet.',
  Author = 'Dante',
  Photo = '/upload/photo.jpg',
  Video = 'https://youtube.com/videolink'
}

export const ContentExample = {
  [LinkModel.name]: `{ link: ${APIExample.Link}, desc: ${APIExample.Desc}}`
}
