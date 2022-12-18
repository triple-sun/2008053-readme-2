import { ContentType, Link, Tag } from "@prisma/client";
import { ContentDTO, LinkDTO, PhotoDTO, QuoteDTO, TextDTO, VideoDTO } from "@readme/core";
import { Comment } from "./comment.interface";

export interface PostBase {
  id?: number;
  type?: ContentType;
  content?: ContentDTO;
  tags?: Tag[];
  likes?: string[];
  comments?: Comment[];
  isRepost?: boolean;
  isDraft?: boolean;
  userID?: string;
  origin?: Post;
  originID?: number;
  authorID?: string;
  publishAt?: Date;
  createdAt?: Date;
}

export interface Post extends PostBase {
  link?: LinkDTO | Pick<Link, 'postID'>
  photo?: PhotoDTO | Pick<Link, 'postID'>
  quote?: QuoteDTO | Pick<Link, 'postID'>
  text?: TextDTO | Pick<Link, 'postID'>
  video?: VideoDTO | Pick<Link, 'postID'>
}
