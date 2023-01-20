/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Comment, ContentType } from "@prisma/client";

export interface IPost {
  id?: number;
  type: ContentType;
  title?: string
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
  comments?: Comment[];
  likeCount?: number;
  commentCount?: number;
  isRepost?: boolean;
  isDraft?: boolean;
  userID?: string;
  originID?: number;
  authorID?: string;
  publishAt?: Date;
  createdAt?: Date;
}
