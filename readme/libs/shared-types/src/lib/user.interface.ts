import { Types } from "mongoose";

export interface User {
  _id?: Types.ObjectId | string;
  email: string;
  name: string;
  avatar: string;
  subscriptions: string[];
  passwordHash: string;
}
