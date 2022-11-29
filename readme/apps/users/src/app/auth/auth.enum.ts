export enum AuthError {
  Email = 'User with this email already exists.',
  NotFound = 'User not found',
  Login = 'Wrong password or user not found.',
  File = 'Only .jpeg or .png files are allowed'
}

export enum AuthInfo {
  Found = 'User found.',
  Updated = 'User info has been successfully updated',
  Login = 'User has logged in successfully.',
  Register = 'New user created successfully',
}

export enum APIDesc {
  Avatar = 'User avatar path',
  Email = 'Unique user email address',
  ID = 'Unique user ID',
  Name = 'Username',
  Pass = 'User password',
  Subs = 'User subscriptions',
  Token = 'User access token'
}

export enum APIExample {
  Avatar = '/dir/file.png',
  Email = 'address@domain.domain',
  ID = '123',
  Name = 'User',
  Pass = 'p4ssw0rd',
  Token = 'user@user.local',
  Subs = '[334, 2251, 2224]',
}

export enum FileValidationErrors {
  UNSUPPORTED_FILE_TYPE = AuthError.File
}
