export enum ENVError {
  APIPort = 'API port is required',
  SMTPHost = 'SMTP server host is required',
  SMTPUser = 'SMTP server user is required',
  SMTPPass = 'SMTP server password is required',
  SMTPPort = 'SMTP server port is required',
  MailFrom = 'Mail "from" address is required',
  DBHost = 'MongoDB host is required',
  DBName = 'Database name is required',
  DBPort = 'MongoDB port is required',
  DBUser = 'MongoDB user is required',
  DBPass = 'MongoDB password is required',
  DBAuthBase = 'MongoDB authentication base is required',
  DBUrl = 'Database url is required',
  UploadDir = 'Upload directory path is required',
  AvatarDir = 'Avatar upload dir is required',
  JwtSecret = 'Jwt secret key is required',
  RMQHost = 'RabbitMQ host is required',
  RMQUser = 'RabbitMQ user is required',
  RMQPass = 'RabbitMQ password is required',
  RMQSubscriberQueue = 'RabbitMQ Subscribers Queue is required',
}

export enum EnvRegisterAs {
  Blog = 'blog',
  Mailer = 'mailer',
  JWT = 'jwt',
  RMQ = 'rmq',
  RMQModule = 'rmqModule',
  Notify = 'notify',
  Users = 'users',
  Mongo = 'mongo'
}
