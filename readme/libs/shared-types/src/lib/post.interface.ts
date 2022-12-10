import { ContentType, Link, Photo, Quote, Text, Video } from "@prisma/client";
import { Comment } from "./comment.interface";
import { Content } from "./content.type";

export interface Post {
  id?: number;
  content?: Content;
  tags?: string[];
  likes?: string[];
  comments?: Comment[]
  isDraft?: boolean;
  isRepost?: boolean;
  originID?: number;
  userID?: string;
  authorID?: string;
  publishAt?: Date;
  createdAt?: Date;
  type?: ContentType;
  link?: Link;
  photo?: Photo;
  quote?: Quote;
  text?: Text;
  video?: Video;
}
