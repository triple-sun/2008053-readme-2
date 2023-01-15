import { Types } from "mongoose";

export interface IUser {
  _id?: Types.ObjectId;
  email: string;
  name: string;
  avatarUrl?: string;
  subscriptions?: Types.ObjectId[];
  passwordHash?: string;
  posts?: number[]
}
