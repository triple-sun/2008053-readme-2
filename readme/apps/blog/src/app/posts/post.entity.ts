import { Entity } from "@readme/core";
import { Comment, Content, Post} from "@readme/shared-types";

export class PostEntity implements Entity<PostEntity>, Post {
  public isDraft: boolean;
  public isRepost: boolean;
  public content: Content;
  public tags: string[]
  public comments: Comment[]
  public likes: string[]
  public authorID?: string;
  public userID: string;
  public originID?: number;
  public createdAt?: Date;
  public publishAt?: Date;

  constructor(post: Post) {
    this.fillEntity(post);
  }

  public async updateTags(tags: string[]) {
    this.tags = tags

    return this;
  }

  public toObject() {
    return {
      ...this,
      comments: this.comments.map(({id}) => ({id}))
    };
  }

  public fillEntity(entity: Post) {
    this.publishAt = new Date();
    this.tags = [...entity.tags];
    this.likes = [...entity.likes];
    this.comments = [...entity.comments];
    this.isDraft = entity.isDraft;
    this.isRepost = entity.isRepost;
    this.authorID = entity.authorID;
    this.originID = entity.originID;
    this.userID = entity.userID;
    this.content = {...entity.content};
  }
}
