import { Comment, ContentType } from "@prisma/client";
import { IEntity, IPost } from "@readme/shared-types";

export class PostEntity implements IEntity<PostEntity>, IPost {
  public id?: number;

  public type: ContentType;
  public title?: string;
  public webLink?: string;
  public desc?: string;
  public text?: string;
  public ann?: string;
  public quote?: string;
  public author?: string;
  public videoLink?: string;
  public photoLink?: string;

  public tags?: string[]
  public likes?: string[]
  public comments?: Comment[]

  public isDraft?: boolean;
  public isRepost?: boolean;

  public userID: string;
  public authorID?: string;
  public originID?: number;

  public publishAt?: Date;
  public createdAt?: Date;

  constructor(post: IPost) {
    this.fillEntity(post);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(entity: IPost) {
    this.isRepost = entity.isRepost ?? false
    this.isDraft = entity.isDraft ?? false;

    this.publishAt = entity.publishAt ?? new Date();
    this.createdAt = !entity.createdAt || entity.isRepost ? new Date() : entity.createdAt;

    this.originID = entity.id
    this.type = entity.type;

    this.tags = [...entity.tags]
    this.likes = [...entity.likes]
    this.comments = entity.comments

    this.userID = entity.userID;
    this.authorID = entity.authorID ?? entity.userID

    this.webLink = entity.webLink
    this.desc = entity.desc
    this.quote = entity.quote
    this.text = entity.text
    this.author = entity.author
    this.ann = entity.ann
    this.photoLink = entity.photoLink
    this.videoLink = entity.videoLink
  }
}
