import { Content, ContentType, Post } from "@readme/shared-types";

export class PostEntity implements Post {
  public _id: string;
  public contentType!: ContentType;
  public content: Content;
  public tags: string[]
  public likes: string[]
  public comments: Comment[]
  public isDraft: boolean;
  public isRepost: boolean;
  public authorID: string;
  public originID: string;
  public userID: string;

  constructor(post: Post) {
    this.fillEntity(post);
  }

  public async updateContent(contentType: ContentType, content: Content) {
    this.contentType = contentType;
    this.content = content;

    return this;
  }

  public async updateTags(tags: string[]) {
    this.tags = tags

    return this;
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(post: Post) {
    this._id = post._id;
    this.contentType = post.contentType;
    this.content = post.content;
    this.tags = post.tags;
    this.likes = post.likes;
    this.comments = post.comments;
    this.isDraft = post.isDraft;
    this.isRepost = post.isRepost;
    this.authorID = post.authorID;
    this.originID = post.originID;
    this.userID = post.userID;
  }
}
