import { Comment, Entity } from '@readme/shared-types';

export class CommentEntity implements Entity<CommentEntity>, Comment {
  public id?: number;
  public text: string;
  public postID: number;
  public userID: string;
  public createdAt?: Date;

  constructor(postID: number, comment: Comment) {
     this.fillEntity(comment);
     this.postID = postID
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(comment: Comment) {
    this.id = comment.id;
    this.text = comment.text;
    this.userID = comment.userID;
    this.createdAt = comment.createdAt
  }
}
