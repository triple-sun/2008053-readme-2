export enum AuthError {
  Email = 'User with this email already exists.',
  NotFound = 'User not found.',
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
