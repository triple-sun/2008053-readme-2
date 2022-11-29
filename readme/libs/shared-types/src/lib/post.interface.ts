import { Content } from "./content/content-type.const";


export interface Post {
  _id?: string;
  type: string;
  content?: Content;
  tags?: string[];
  isDraft?: boolean;
  isRepost?: boolean
  userID?: string;
  authorID?: string;
  originID?: string;
}
