import { ObjectId } from "mongoose";
import { FileSystemStoredFile } from "nestjs-form-data";

export interface IUser {
  _id?: ObjectId;
  id?: ObjectId;
  email: string;
  name: string;
  avatar?: FileSystemStoredFile;
  avatarLink?: string;
  subscriptions?: ObjectId[];
  subscribers?: ObjectId[];
  subs?: ObjectId[];
  passwordHash?: string;
  notifiedAt?: Date;
}
