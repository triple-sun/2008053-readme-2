import { ContentType } from "@prisma/client"
import { IPost } from "@readme/shared-types"
import { PostLinkRDO, PostPhotoRDO, QuoteRDO, TextRDO, VideoRDO } from "../dto/rdo/post.rdo"
import { fillObject } from "../utils/common.utils"
import { Size } from "./size.const"

export const IncludeForPost = { comments: { take: Size.Comments.Max }}

export const TagRegExp = /^[a-z]*[a-z][a-z0-9-._]*$/g
export const imageExtRegExp = (/[/.](jpe?g|png)$/i)

export const RDOForPosts = {
  [ContentType.PHOTO]: (posts: IPost[]) => posts.map((post) => fillObject(PostPhotoRDO, post)),
  [ContentType.LINK]: (post: IPost) => fillObject(PostLinkRDO, post),
  [ContentType.QUOTE]: (post: IPost) => fillObject(QuoteRDO , post),
  [ContentType.TEXT]: (post: IPost) => fillObject(TextRDO, post),
  [ContentType.VIDEO]: (post: IPost) => fillObject(VideoRDO, post)
}
