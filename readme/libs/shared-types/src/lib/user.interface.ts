import { FileSystemStoredFile } from "nestjs-form-data";

export interface IUser {
  _id?: string;
  id?: string;
  email: string;
  name: string;
  avatar?: FileSystemStoredFile;
  avatarLink?: string;
  subscriptions?: string[];
  subscribers?: string[];
  passwordHash?: string;
}
