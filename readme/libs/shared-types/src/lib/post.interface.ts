/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { ContentType } from "@prisma/client";
import { IComment } from "./comment.interface";

export interface IPost {
  id?: number;
  type: ContentType;
  link?: string
  desc?: string
  text?: string
  ann?: string
  quote?: string
  author?: string
  videoLink?: string;
  photoLink?: string;
  tags?: string[];
  likes?: string[];
  comments?: IComment[];
  likeCount?: number;
  commentCount?: number;
  isRepost?: boolean;
  isDraft?: boolean;
  userID: string;
  originID?: number;
  authorID?: string;
  publishAt?: Date;
  createdAt?: Date;
}
