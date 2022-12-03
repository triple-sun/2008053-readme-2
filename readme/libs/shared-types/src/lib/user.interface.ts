export interface User {
  _id?: string;
  email: string;
  name: string;
  avatarUrl: string;
  subscriptions: string[];
  passwordHash: string;
}
