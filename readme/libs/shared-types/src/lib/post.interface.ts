import { Ref } from "@typegoose/typegoose";
import { Content } from "./content.types";

export interface Post {
  _id?: string;
  type: string;
  content: Ref<Content>;
  tags?: string[];
  isDraft?: boolean;
  isRepost?: boolean
  userID: string;
  authorID?: string;
  originID?: string;
}
