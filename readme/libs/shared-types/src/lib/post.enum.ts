import { ContentType } from "@prisma/client";

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

export enum PostAPIDesc {
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
  Link = 'Link and description',
  Text = 'Title, announcement and text',
  Quote = 'Quote and author',
  Photo = 'Photo url',
  Video = 'Video title and url'
}

export enum PostAPIExample {
  Bool = 'true',
  Type = 'VIDEO',
  ID = '22',
  Tags = `['tag', 'another tag', 'one more tag', '8 tags max']`,
  Link = 'link@domain.domain',
  Desc = 'really cool link',
  Title = 'Eample post title',
  Ann = 'Lorem ipsum dolor sit amet.',
  Text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada.',
  Quote = 'Lorem ipsum dolor sit amet.',
  Author = 'Dante',
  Photo = '/upload/photo.jpg',
  Video = 'https://youtube.com/video'
}

export const PostContentExample = {
  [ContentType.LINK]: `{ type: 'LINK', link: ${PostAPIExample.Link}, desc: ${PostAPIExample.Desc}}`,
  [ContentType.PHOTO]: `{ type: 'PHOTO', photo: ${PostAPIExample.Photo}}`,
  [ContentType.QUOTE]: `{ type: 'QUOTE', quote: ${PostAPIExample.Quote}, author: ${PostAPIExample.Author}}`,
  [ContentType.TEXT]: `{ type: 'TEXT', title: ${PostAPIExample.Title}, ann: ${PostAPIExample.Ann}, text: ${PostAPIExample.Text}}`,
  [ContentType.VIDEO]: `{ type: 'VIDEO', title: ${PostAPIExample.Title}, videoUrl: ${PostAPIExample.Video}}`,
}
