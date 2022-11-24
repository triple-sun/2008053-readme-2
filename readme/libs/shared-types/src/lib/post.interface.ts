import { ContentType } from "./content.enum";
import { Content } from "./content.types";

export interface Post {
  _id?: string;
  type?: ContentType;
  content?: Content;
  tags?: string[];
  isDraft?: boolean;
  isRepost?: boolean
  authorID?: string;
  originID?: string;
  userID?: string;
}
