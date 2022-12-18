export enum Port {
  Min = 0,
  Max = 65535,
  DBDefault = 27017
}

export enum Prefix {
  API = 'api',
  Auth = 'auth',
  Blog = 'blog',
  Comments = 'comments',
  Posts = 'posts',
  User = 'users'
}

export enum ParamName {
  UserID = 'userID',
  PostID = 'postID',
  CommentID = 'commentID',
  ID = 'id',
  Type = 'type'
}

export enum Path {
  Avatar = 'avatar',
  Blog = 'blog',
  Posts = 'posts',
  Comments = 'comments',
  Register = 'register',
  SpecUsers = 'spec-users',
  SpecBlog = 'spec-blog',
  Login = 'login',
  Upload = 'upload',
  Subscribe = 'sub',
  Subscriptions = 'subs',
  Users = 'users',
  Repost = 'repost'
}

export enum EntityName {
  User = 'User',
  Post = 'Post',
  Comment = 'Comment'
}

export enum KeyName {
  ID = 'id',
  ObjectID = '_id',
}



export enum Title {
  Blog = 'Blog service',
  Users = 'Users service'
}

export enum Desc {
  Blog = 'Blog service API',
  Users = 'Users service API'
}

export enum Version {
  Blog = '1.0',
  Users = '1.0'
}

export enum Info {
  AppRun = '🚀 Application is running on:  http://localhost:'
}

export enum ENVError {
  DBHost = 'MongoDB host is required',
  DBName = 'Database name is required',
  DBPort = 'MongoDB port is required',
  DBUser = 'MongoDB user is required',
  DBPass = 'MongoDB password is required',
  DBAuthBase = 'MongoDB authentication base is required',
  UploadDir = 'Upload directory path is required',
  AvatarDir = 'Avatar upload dir is required',
  JwtSecret = 'Jwt secret key is required'
}

export enum MinMax {
  TagMin = 3,
  TagMax = 10,
  TagsLimit = 8,
  TitleMin = 20,
  TitleMax = 50,
  AnnMin = 50,
  AnnMax = 255,
  TextMin = 100,
  TextMax = 1024,
  QuoteMin = 20,
  QuoteMax = 300,
  AuthorMin = 3,
  AuthorMax = 50,
  PhotoMaxBytes = 1000000,
  DescMax = 300,
  UserNameMin = 3,
  UserNameMax = 50,
  UserPassMin = 6,
  UserPassMax = 12,
  AvatarMaxBytes = 500000,
  CommentMin = 10,
  CommentMax = 300,
  CommentsLimit = 30,
  PostsLimit = 25
}
