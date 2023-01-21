export enum AppName {
  API = 'API',
  Blog = 'Blog',
  BFF = 'BFF',
  Mailer = 'Mailer',
  JWT = 'Jwt',
  RMQ = 'Rmq',
  FormData = 'Form-data',
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
  GetPosts = 'rpc-posts',
  Notify = 'rpc-notify',
  Notified = 'rpc-notified',
  GetUser = 'rpc-users',
  NewSub = 'rpc-new-sub',
}


export enum SortByType {
  Date = 'createdAt',
  Likes = 'likes',
  Comm = 'comments',
}

export enum UploadType {
  Photo = 'photo',
  Avatar = 'avatar'
}
