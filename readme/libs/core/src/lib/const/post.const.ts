import { Size } from "../utils/size.utils"

export const IncludeForPost = { comments: { take: Size.Comments.Max }}

export const TagRegExp = /^[a-z]*[a-z][a-z0-9-._]*$/g
export const imageExtRegExp = (/[/.](jpe?g|png)$/i)
