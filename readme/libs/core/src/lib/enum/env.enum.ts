export enum ENVError {
  APIPort = 'API port is required',
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

export enum ENVFIlePath {
  Blog = 'environments/.blog.env',
  Notify = 'environments/.notify.env',
  Users = 'environments/.users.env'
}

export enum EnvRegisterAs {
  Blog = 'blog',
  Notify = 'notify',
  Users = 'users'
}
