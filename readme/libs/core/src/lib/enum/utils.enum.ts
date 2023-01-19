export enum PortDefault {
  Mongo = 27017,
  Mailer = 5025,
  BlogAPI = 3333,
  NotifyAPI = 3334,
  UsersAPI = 3335,
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
  Author = 'author',
  Avatar = 'avatar',
  Drafts = 'drafts',
  Blog = 'blog',
  Posts = 'posts',
  Post = 'post',
  Comments = 'comments',
  Delete = 'delete',
  Register = 'register',
  Spec = 'spec',
  Login = 'login',
  Upload = 'upload',
  Photo = 'photo',
  Like = 'like',
  Link = 'link',
  Search = 'search',
  Tag = 'tag',
  Title = 'title',
  Type = 'type',
  Feed = 'feed',
  Subscribe = 'subscribe',
  Subscriptions = 'subs',
  Users = 'users',
  User = 'user',
  Repost = 'repost',
  Notify = 'notify',
  Update = 'update'
}

export enum Entity {
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
