export enum PortDefault {
  Mongo = 27017,
  Mailer = 5025,
  Blog = 3333,
  Notify = 3334,
  Users = 3335,
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

export enum Entity {
  User = 'User',
  Post = 'Post',
  Comment = 'Comment',
  Subscriber = 'Subscriber',
}

export enum ContentEntity {
  Link = 'Link',
  Photo = 'Photo',
  Video = 'Video',
  Quote = 'Quote',
  Text = 'Text'
}
