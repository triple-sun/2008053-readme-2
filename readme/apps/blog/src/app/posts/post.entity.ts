import { ContentType } from "@prisma/client";
import { ContentDTO, TagDTO } from "@readme/core";
import { Entity, Post, PostBase } from "@readme/shared-types";

export class PostEntity implements Entity<PostEntity>, PostBase {
  public isDraft: boolean;
  public isRepost: boolean;
  public tags: TagDTO[]
  public commentIDs: number[]
  public likes: string[]
  public userID: string;
  public createdAt?: Date;
  public publishAt?: Date;
  public type?: ContentType;
  public content: ContentDTO;
  public authorID?: string;
  public originID?: number;
  public origin?: Post;

  constructor(post: Post) {
    this.fillEntity(post);
  }

  public toObject() {
    return {...this};
  }

  public toUpdate(): PostBase {
    return {...this}
  }

  public toCreate() {
    return {
      ...this,
      [this.content.type.toLowerCase()]: this.content
    }
  }

  public fillEntity(entity: Post) {
    this.isRepost = entity.isRepost;
    this.publishAt = new Date();

    this.type = entity.type;
    this.content = {...entity.content}

    this.isDraft = entity.isDraft;
    this.userID = entity.userID;
    this.tags = entity.tags ?? []
    this.likes = entity.likes ?? []

    this.authorID = entity.userID
    this.originID = entity.id
  }
}
