export interface IUser {
  _id?: string;
  id?: string;
  email: string;
  name: string;
  avatarLink?: string;
  subscriptions?: string[];
  passwordHash?: string;
  notifiedAt?: Date;
}
