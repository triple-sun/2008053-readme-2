import { IUser } from "./user.interface";

export interface ISub extends Pick<IUser, 'id' | '_id' | 'email' | 'name'> {
  userId: string;
  notifiedAt?: Date;
}
