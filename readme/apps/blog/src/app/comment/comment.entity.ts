import { IComment, IEntity } from '@readme/shared-types';

export class CommentEntity implements IEntity<CommentEntity>, IComment {
  public id?: number;
  public comment: string;
  public postId: number;
  public userId: string;

  constructor(comment: IComment) {
     this.fillEntity(comment);
  }

  public toObject() {
    return {...this, userId: this.userId.toString()};
  }

  public fillEntity(comment: IComment) {
    this.comment = comment.comment;
    this.userId = comment.userId.toString();
    this.postId = comment.postId;
  }
}
