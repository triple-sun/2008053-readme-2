import { IUser } from "./user.interface";

export interface ISubscriber extends Pick<IUser, 'id' | 'email' | 'name'> {
  userID: string;
}
