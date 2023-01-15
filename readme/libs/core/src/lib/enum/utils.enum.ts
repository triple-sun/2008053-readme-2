export enum Port {
  Min = 0,
  Max = 65535,
  DBDefault = 27017,
  BlogAPIDefault = 3333,
  NotifyAPIDefault = 3334,
  UsersAPIDefault = 3335,
  MailDefault = 5025
}

export enum UploadType {
  Photo = 'photo',
  Avatar = 'avatar'
}

export enum EnvFilePath {
  Blog = 'environments/blog.env',
  Notify = 'environments/notify.env',
  Users = 'environments/users.env'
}

export enum Prefix {
  Global = 'api',
  Auth = 'auth',
  Blog = 'blog',
  Comments = 'comments',
  Mail = 'mail',
  Posts = 'posts',
  User = 'users'
}

export enum Path {
  Avatar = 'avatar',
  Blog = 'blog',
  Posts = 'posts',
  Comments = 'comments',
  Register = 'register',
  Spec = 'spec',
  Login = 'login',
  Upload = 'upload',
  Photo = 'photo',
  Link = 'link',
  Subscribe = 'subscribe',
  Subscriptions = 'subs',
  Users = 'users',
  Repost = 'repost',
  SendNewPosts = 'send-new'
}

export enum EntityName {
  User = 'User',
  Post = 'Post',
  Comment = 'Comment',
  Subscriber = 'Subscriber',
  Link = 'Link',
  Photo = 'Photo',
  Video = 'Video',
  Quote = 'Quote',
  Text = 'Text'
}
