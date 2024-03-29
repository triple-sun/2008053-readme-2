export enum EAppError {
  Fetch = 'Can\'t fetch data from',
  Env = 'Can\'t read .env file. Perhaps the file does not exist.',
  File = 'Validation failed (file expected)',
  Email = 'Please enter valid email',
  AvatarUrl = 'Should be in .jpg or .png format',
  MovieImgUrl = 'Should be in .jpg format',
  Date = 'Must be valid ISO date',
  Genre = 'Must be a valid genre',
  Image = 'An image is required',
  ImageLength = 'Too short for field containing image',
  Integer = 'Must be an integer',
  Array = 'Must be an array',
  Link = 'Must be a valid link',
  ID = 'Must be valid ID',
  PasswordLength = 'Password length must be from 6 to 12 symbols',
  Rating = 'From 1 to 10',
  Salt = 'Missing password salt',
  Exists = 'already exists.',
  NotImplemented = 'Not implemented',
  UserEmail = 'User with email',
  ObjectID = 'is invalid ObjectID',
  Unauthorized = 'Unauthorized',
  Token = 'Invalid token',
  Validation = 'Validation error:',
  Subscriber = 'The subscriber with same email already exists',
  MongoID = 'Bad entity ID',
  DtoType = 'Wrong dto content for post type',
  Type = 'Wrong post type',
  TagsLimit = 'Posts can only have 8 tags or less',
  ParamArg = 'This pipe must used only with params!',
  BodyArg = 'This pipe must used only with body!',
  FileType = 'File type is not matching:',
  Auth = 'You are not authorized',
  TripleRepost = 'You can`t repost your own posts.',
  SelfSubscribe = 'You can`t subscribe to yourself',
  DuplicateRepost = 'You can`t repost the same post twice',
  Published = 'This post is already published',
  QueryType = 'Wrong type query',
  NotFound = 'was not found',
  Internal = 'Internal server error',
  Forbidden = 'You are not authorized or do not have permission to acess or edit this',
  Conflict = 'Failed to update or create new entity with provided data'
}
