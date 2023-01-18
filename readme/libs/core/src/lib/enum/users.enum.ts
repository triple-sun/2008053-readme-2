export enum UsersConfig {
  SaltRounds = 10
}

export enum AuthError {
  Email = 'User with this email already exists.',
  NotFound = 'User not found.',
  Sub = 'Subscription target user not found.',
  Login = 'Wrong password or user not found.',
  File = 'Only .jpeg, .jpg and .png files are allowed.'
}

export enum UserInfo {
  Avatar = 'Avatar uploaded successfully.',
  Found = 'User found.',
  Updated = 'User info has been successfully updated.',
  Login = 'User has logged in successfully.',
  Register = 'New user created successfully',
}

export enum UserError {
  Email = 'User email is not valid',
  SelfSubscribe = 'You can`t subscribe to yourself'
}

export enum UserAPIDesc {
  Avatar = 'User avatar',
  AvatarUrl = 'User avatar path',
  Email = 'Unique user email address',
  ID = 'Unique user ID',
  Name = 'User name',
  Pass = 'User password',
  Subscribers = 'Subscribers',
  Token = 'User JWT access token',
  SubTo = 'User id to subscribe/unsubsribe to',
  PostIDs = 'Post ids'
}

export enum UserAPIExample {
  FilePath = '/dir/file.png',
  Email = 'address@domain.domain',
  ID = 'fewvqr2f12fe1wd',
  Name = 'User',
  Pass = 'p4ssw0rd',
  Token = 'user@user.local',
  Subscribers = '[334, 2251, 2224]',
  PostIDs = '["2", "33", "65"]'
}

