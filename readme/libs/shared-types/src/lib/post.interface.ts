/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { ContentType, Link, Tag } from "@prisma/client";
import { ContentDTO, LinkDTO, PhotoDTO, QuoteDTO, TextDTO, VideoDTO } from "@readme/core";
import { IComment } from "./comment.interface";

export interface IPostBase {
  id?: number;
  type?: ContentType;
  content?: ContentDTO;
  tags?: Tag[];
  likes?: string[];
  comments?: IComment[];
  isRepost?: boolean;
  isDraft?: boolean;
  userID?: string;
  origin?: IPost;
  originID?: number;
  authorID?: string;
  publishAt?: Date;
  createdAt?: Date;
}

export interface IPost extends IPostBase {
  link?: LinkDTO | Pick<Link, 'postID'>
  photo?: PhotoDTO | Pick<Link, 'postID'>
  quote?: QuoteDTO | Pick<Link, 'postID'>
  text?: TextDTO | Pick<Link, 'postID'>
  video?: VideoDTO | Pick<Link, 'postID'>
}
