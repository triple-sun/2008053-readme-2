export enum CommentError {
  Permission = 'You can only delete your own comments',
  NotFound = 'Comment not found',
}

export enum CommentInfo {
  Loaded = 'Comments have been loaded successfully.',
  Created = 'New comment created successfully.',
  Deleted = 'Your comment has been successfully deleted.',
}

export enum CommentAPIDesc {
  Limit = 'Max comments per page',
  UserID = 'Unique comment author ID',
  CommentID = 'Unique comment ID',
  PostID = 'Unique post ID',
}

export enum CommentAPIExample {
  Feed = '[{comment}, {comment}, {comment}]',
  Limit = 10,
  ID = 123,
  Text = 'Lorem ipsum dolor set amet',
}
