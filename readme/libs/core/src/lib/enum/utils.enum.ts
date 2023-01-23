export enum AppName {
  API = 'API',
  Blog = 'Blog',
  BFF = 'BFF',
  BFFUsers = 'BFFUsers',
  BFFCOmments = 'BFFComments',
  BFFPosts = 'BFFPosts',
  Mailer = 'Mailer',
  JWT = 'Jwt',
  RMQ = 'Rmq',
  FormData = 'FormData',
  Notify = 'Notify',
  Users = 'Users',
  Mongo = 'Mongo',
  Post = 'Post',
  Comment = 'Comment',
  Auth = 'Auth'
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
  BFF = 3332
}

export enum Prefix {
  Global = 'api',
  Auth = 'auth',
  Blog = 'blog',
  Mail = 'mail',
  User = 'users',
  Users = 'users',
  Posts = 'posts',
  Comments = 'comments',
  Subscribers = 'subscribers',
  Service = 'service'
}

export enum RPC {
  LoginUser = 'rpc-users-login',
  Notify = 'rpc-notify',
  AddComment = 'rpc-comments-add',
  AddSub = 'rpc-sub-add',
  AddUser = 'rpc-user-add',
  AddPost = 'rpc-posts-new',
  DeleteComment = 'rpc-comments-delete',
  DeletePost = 'rpc-posts-delete',
  GetFeed = 'rpc-posts-feed',
  GetNewPosts = 'rpc-posts-new',
  GetUser = 'rpc-user-get',
  GetPosts = 'rpc-post-list',
  GetPost = 'rpc-post',
  GetSub = 'rpc-subs-get',
  PostsSearchFor = 'rpc-search',
  PostsByUser = 'rpc-posts-user',
  PostsForFeed = 'rpc-posts-feed',
  CommentsforPost = 'rpc-comments',
  UpdatePost = 'rpc-posts-update',
  UpdateUser = 'rpc-users-update',
  UpdateSub = 'rpc-subs-update',
  Subscribe = 'rpc-users-subscrbe',
  VerifyUser = 'rpc-verify-user',
  VerifyPass = 'rpc-verify-pass'
}

export enum QueryType {
  Tag = 'tag',
  Type = 'type',
  Search = 'search',
  Since = 'since',
  AuthorId = 'authorId',
  UserId = 'userId',
  IsDraft = 'isDraft',
  Feed = 'feed'
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
