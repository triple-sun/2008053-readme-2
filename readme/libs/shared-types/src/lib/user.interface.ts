import { Types } from "mongoose";

export interface IUser {
  _id?: string;
  id?: string;
  email?: string;
  name?: string;
  avatar?: string;
  subscriptions?: Types.ObjectId[];
  passwordHash?: string;
  notifiedAt?: Date;
}
