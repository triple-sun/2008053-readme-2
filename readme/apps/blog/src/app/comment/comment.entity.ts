import { IComment, IEntity } from '@readme/shared-types';

export class CommentEntity implements IEntity<CommentEntity>, IComment {
  public id?: number;
  public comment: string;
  public postID: number;
  public userID: string;

  constructor(comment: IComment) {
     this.fillEntity(comment);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(comment: IComment) {
    this.comment = comment.comment;
    this.userID = comment.userID;
    this.postID = comment.postID;
  }
}
