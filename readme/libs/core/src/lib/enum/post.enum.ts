import { ContentType } from "@prisma/client";



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

export enum PostAPIDesc {
  Ann = 'Post announcement',
  Author = 'Quote author',
  Type = 'Post content type',
  ID = 'Unique post ID',
  Feed = 'Post feed',
  Tags = 'Post tags array',
  Title = 'Post title',
  Tag = 'Post tag',
  Desc = 'Post description',
  Draft = 'This post is a draft',
  Repost = 'This post is a repost',
  AuthorID = 'Original post author ID',
  Origin = 'Original post',
  UserID = 'Unique poster ID',
  Content = 'Post content (schema depends on post type)',
  LinkUrl = 'Link url',
  Text = 'Title, announcement and text',
  Quote = 'Quote and author',
  Photo = 'Photo url',
  VideoUrl = 'Video url'
}

export enum PostAPIExample {
  Bool = 'true',
  Type = 'VIDEO',
  ID = '22',
  Tag = 'tag',
  Tags = `['tag', 'another tag', 'one more tag', '8 tags max']`,
  LinkUrl = 'https://link.subdomain.domain',
  Desc = 'Really nice link',
  Title = 'Eample post title',
  Ann = 'Lorem ipsum dolor sit amet.',
  Text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada.',
  Quote = 'Lorem ipsum dolor sit amet.',
  Author = 'Dante',
  Photo = '/upload/photo.jpg',
  VideoUrl = 'https://youtube.com/video',
}

export const PostContentExample = {
  [ContentType.LINK]: `{ type: 'LINK', link: ${PostAPIExample.LinkUrl}, desc: ${PostAPIExample.Desc}}`,
  [ContentType.PHOTO]: `{ type: 'PHOTO', photo: ${PostAPIExample.Photo}}`,
  [ContentType.QUOTE]: `{ type: 'QUOTE', quote: ${PostAPIExample.Quote}, author: ${PostAPIExample.Author}}`,
  [ContentType.TEXT]: `{ type: 'TEXT', title: ${PostAPIExample.Title}, ann: ${PostAPIExample.Ann}, text: ${PostAPIExample.Text}}`,
  [ContentType.VIDEO]: `{ type: 'VIDEO', title: ${PostAPIExample.Title}, videoUrl: ${PostAPIExample.VideoUrl}}`,
}
