import { ConflictException, ForbiddenException, NotFoundException } from "@nestjs/common"
import { IComment, IPost, IUser } from "@readme/shared-types"
import { AppError, CommentError, PostError, UserError } from "../const/error.const"
import { Property } from "../enum/property.enum"

export const Validate = ({
  User: {
      Registered: (user?: IUser) => () => {
        if (user) {
          throw new ConflictException(UserError.Email.Exists(user.id, {property: Property.UserID}))
        }
      },
      Exists: ({id, email}, user?: IUser) => () => {
        if (!user) { throw new NotFoundException(email
            ? UserError.Email.NotFound(email)
            : UserError.ID.NotFound(id))}
      }
  },
  Post: {
    Exists: (postID: number, post?: IPost) => () => {
      if (!post) {
        throw new NotFoundException(PostError.NotFound(postID))
      }
    },
    User: (post: IPost, userID: string) => () => {
      if (post.userID !== userID) { throw new ForbiddenException(UserError.ID.Permission)}},
    Repost: (origin: IPost, userID: string) => () =>  {
      if (origin.authorID === userID) { throw new ConflictException(AppError.SelfRepost)}
      if (origin.userID === userID) { throw new ConflictException(AppError.DuplicateRepost)}}
  },
  Comment: {
    User: (comment: IComment, userID: string) => () =>  {
      if (comment.userID === userID) {
        throw new ForbiddenException(CommentError.Permission)
      }
    },
    Exists: (commentID: number, comment?: IComment) => () => {
      if (!comment) {
        throw new NotFoundException(CommentError.NotFound(commentID))
      }
    }
  }
})
