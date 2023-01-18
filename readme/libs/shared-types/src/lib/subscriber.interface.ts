export interface ISubscriber {
  id?: string;
  email: string;
  name: string;
  userID: string;
  notifiedAt?: Date;
  posts?: number[]
  subscriptions?: string[]
}
