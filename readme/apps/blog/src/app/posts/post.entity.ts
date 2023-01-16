import { ContentType } from "@prisma/client";
import { IEntity, IPost } from "@readme/shared-types";

export class PostEntity implements IEntity<PostEntity>, IPost {
  public id?: number;
  public type: ContentType;
  public title?: string;
  public link?: string;
  public desc?: string;
  public text?: string;
  public ann?: string;
  public quote?: string;
  public author?: string;
  public videoLink?: string;
  public photoLink?: string;

  public tags?: string[]
  public likes?: string[]
  public commentIDs?: number[]

  public isDraft?: boolean;
  public isRepost?: boolean;

  public userID: string;
  public authorID?: string;
  public originID?: number;

  public publishAt?: Date;

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

    this.id = entity.id;
    this.type = entity.type;

    this.tags = [...entity.tags]
    this.likes = [...entity.likes]

    this.userID = entity.userID;
    this.authorID = entity.authorID ?? entity.userID
    this.originID = entity.originID

    this.link = entity.link
    this.desc = entity.desc
    this.quote = entity.quote
    this.text = entity.text
    this.author = entity.author
    this.ann = entity.ann
  }
}
