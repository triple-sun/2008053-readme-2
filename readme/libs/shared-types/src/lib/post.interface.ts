import { ContentType } from "./content-type.enum";
import { Content } from "./content.type";

export interface Post {
  _id?: string;
  contentType: ContentType;
  content?: Content;
  tags?: string[];
  likes?: string[];
  comments?: Comment[]
  isDraft?: boolean;
  isRepost?: boolean
  userID?: string;
  authorID?: string;
  originID?: string;
}
