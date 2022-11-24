export interface User {
  _id?: string;
  email: string;
  name: string;
  avatar?: string;
  subscriptions?: string[];
  passwordHash: string;
}
