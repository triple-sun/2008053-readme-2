import { fillEntity } from '@readme/core';
import { Comment } from '@readme/shared-types';

export class CommentEntity implements Comment {
  public _id: string;
  public text: string;
  public postID: string;
  public userID: string;

  constructor(comment: Comment) {
     fillEntity<Comment, CommentEntity>(comment, this);
  }

  public toObject() {
    return {...this};
  }
}
