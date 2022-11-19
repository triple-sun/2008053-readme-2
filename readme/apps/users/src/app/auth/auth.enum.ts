export enum AuthError {
  Email = 'User with this email already exists.',
  Login = 'Wrong password or user not found.'
}

export enum AuthInfo {
  Found = 'User found.',
  Login = 'User has logged in successfully.',
  Register = 'New user created successfully',
}

export enum APIDesc {
  Avatar = 'User avatar path',
  Email = 'Unique user email address',
  ID = 'Unique user ID',
  Name = 'Username',
  Pass = 'User password',
  Token = 'User access token'
}

export enum APIExample {
  Avatar = '/dir/file.png',
  Email = 'address@domain.domain',
  ID = '123',
  Name = 'User',
  Pass = 'p4ssw0rd',
  Token = 'user@user.local'
}
