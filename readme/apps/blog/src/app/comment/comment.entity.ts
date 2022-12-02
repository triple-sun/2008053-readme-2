import { Comment } from '@readme/shared-types';

export class CommentEntity implements Comment {
  public _id: string;
  public text: string;
  public postID: string;
  public userID: string;

  constructor(comment: Comment) {
     this.fillEntity(comment);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(comment: Comment) {
    this._id = comment._id;
    this.text = comment.text;
    this.postID = comment.postID;
    this.userID = comment.userID;
  }
}
