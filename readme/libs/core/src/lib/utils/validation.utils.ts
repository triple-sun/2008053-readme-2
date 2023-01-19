import { ConflictException, ForbiddenException, NotFoundException } from "@nestjs/common"
import { IComment, IPost } from "@readme/shared-types"
import { PostError } from "../enum/post.enum"
import { EntityError } from "../error/message.error"

const {User, Post, Comment} = EntityError

export const ValidateUser = {
  AlreadyExists: (user) => { if (user) { throw new ConflictException(User.Email.Exists(user.email))}},
  Exists: (user, {id, email}) => { if (!user) {throw new NotFoundException(User.ID.NotFound(email ?? id))}}
}

export const validatePostExists = (post: IPost, postID: number) => {
  if (!post) {
    throw new NotFoundException(Post.NotFound(postID))
  }
}

export const validatePostUserID = (post: IPost, userID: string) => {
  if (post.userID !== userID) {
    throw new ForbiddenException(Post.Permission())
  }
}

export const validateRepost = (origin: IPost, userID: string) => {
    if (origin.authorID === userID) {
      throw new ConflictException(PostError.SelfRepost)
    }

    if (origin.userID === userID) {
      throw new ConflictException(PostError.DuplicateRepost)
    }
}

export const validateCommentUserID = (comment: IComment, userID: string) => {
    if (comment.userID === userID) {
      throw new ForbiddenException(Comment.Permission())
    }
}

export const validateCommentExists = (commentID: number, comment?: IComment) => {
  if (!comment) {
    throw new NotFoundException(Comment.NotFound(commentID))
  }
}
