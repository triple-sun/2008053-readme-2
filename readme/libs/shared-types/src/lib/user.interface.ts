import mongoose from "mongoose";

export interface IUser {
  _id?: mongoose.Types.ObjectId;
  email: string;
  name: string;
  avatarUrl: string;
  subscribers: string[];
  passwordHash: string;
  posts?: number[]
}
