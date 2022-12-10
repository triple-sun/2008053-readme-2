import { Entity } from '@readme/core';
import { Comment } from '@readme/shared-types';

export class CommentEntity implements Entity<CommentEntity>, Comment {
  public text: string;
  public postID: number;
  public userID: string;

  constructor(postID: number, comment: Comment) {
     this.fillEntity(comment);
     this.postID = postID
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(comment: Comment) {
    this.text = comment.text;
    this.userID = comment.userID;
  }
}
