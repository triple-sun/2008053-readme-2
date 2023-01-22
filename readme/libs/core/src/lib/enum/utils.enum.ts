export enum AppName {
  API = 'API',
  Blog = 'Blog',
  BFF = 'BFF',
  Mailer = 'Mailer',
  JWT = 'Jwt',
  RMQ = 'Rmq',
  FormData = 'FormData',
  Notify = 'Notify',
  Users = 'Users',
  Mongo = 'Mongo'
}

export enum Collection {
  Users = 'users',
  Posts = 'posts',
  Comments = 'comments',
  Subscribers = 'subscribers'
}

export enum Entity {
  User = 'User',
  Post = 'Post',
  Comment = 'Comment',
  Subscriber = 'Subscriber',
}

export enum EnvFilePath {
  Blog = 'environments/blog.env',
  Notify = 'environments/notify.env',
  Users = 'environments/users.env'
}

export enum Consumes {
  FormData = 'multipart/form-data',
  AppJson = 'application/json'
}

export enum PortDefault {
  Mongo = 27017,
  Mailer = 5025,
  Blog = 3333,
  Notify = 3334,
  Users = 3335,
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

export enum RPC {
  Notify = 'rpc-notify',
  AddComment = 'rpc-comments-add',
  AddSub = 'rpc-sub-add',
  AddUser = 'rpc-user-add',
  AddPost = 'rpc-posts-new',
  DeleteComment = 'rpc-comments-delete',
  DeletePost = 'rpc-posts-delete',
  GetUser = 'rpc-user-xget',
  GetPosts = 'rpc-post-list',
  GetPost = 'rpc-post',
  PostsSearchFor = 'rpc-search',
  PostsByUser = 'rpc-posts-user',
  PostsForFeed = 'rpc-posts-feed',
  CommentsforPost = 'rpc-comments',
  UpdatePost = 'rpc-posts-update',
  UpdateUser = 'rpc-users-update',
  UpdateSub = 'rpc-subs-update',
  Subscribe = 'rpc-users-subscrbe'
}

export enum SortByType {
  Date = 'createdAt',
  Likes = 'likes',
  Comm = 'comments',
}

export enum Upload {
  Photo = 'photo',
  Avatar = 'avatar'
}
