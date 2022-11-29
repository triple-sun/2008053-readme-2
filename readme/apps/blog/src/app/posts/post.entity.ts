import { fillEntity } from "@readme/core";
import { Content, Post } from "@readme/shared-types";

export class PostEntity implements Post {
  public _id: string;
  public type!: string;
  public content: Content;
  public tags: string[]
  public likes: string[]
  public comments: string[]
  public isDraft: boolean;
  public isRepost: boolean;
  public authorID: string;
  public originID: string;
  public userID: string;

  constructor(post: Post) {
     fillEntity<Post, PostEntity>(post, this);
  }

  public toObject() {
    return {...this};
  }
}
