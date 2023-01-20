import { ConflictException, ForbiddenException, NotFoundException } from "@nestjs/common"
import { AppError } from "@readme/error"
import { IComment, IPost, IUser } from "@readme/shared-types"
import Property from "../enum/property.enum"

export const Validate = ({
  User: {
      Registered: (user?: IUser) => () => {
        if (user) {
          throw new ConflictException(AppError.User.Email.Exists(user.id, {property: Property.UserID}))
        }
      },
      Exists: ({id, email}, user?: IUser) => () => {
        if (!user) {
          throw new NotFoundException(email
            ? AppError.User.Email.NotFound(email)
            : AppError.User.ID.NotFound(id)
          )
      }
    }
  },
  Post: {
    Exists: (postID: number, post?: IPost) => () => {
      if (!post) {
        throw new NotFoundException(AppError.Post.NotFound(postID))
      }
    },
    User: (post: IPost, userID: string) => () => {
      if (post.userID !== userID) { throw new ForbiddenException(AppError.User.ID.Permission)}},
    Repost: (origin: IPost, userID: string) => () =>  {
      if (origin.authorID === userID) { throw new ConflictException(AppError.Core.SelfRepost)}
      if (origin.userID === userID) { throw new ConflictException(AppError.Core.DuplicateRepost)}}
  },
  Comment: {
    User: (comment: IComment, userID: string) => () =>  {
      if (comment.userID === userID) {
        throw new ForbiddenException(AppError.Comment.Permission)
      }
    },
    Exists: (commentID: number, comment?: IComment) => () => {
      if (!comment) {
        throw new NotFoundException(AppError.Comment.NotFound(commentID))
      }
    }
  }
})
