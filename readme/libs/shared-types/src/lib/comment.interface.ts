export interface IComment {
  id?: number;
  text: string;
  userID: string;
  postID: number;
  createdAt?: Date;
}
