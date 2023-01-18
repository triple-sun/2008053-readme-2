import { MinMax } from "../enum/minmax.enum";

export const PostInclude = {
  comments: {
    take: MinMax.CommentsLimit,
  }
}

export const TagRegExp = /^[a-z]*[a-z][a-z0-9-._]*$/g
export const imageExtRegExp = (/[/.](jpe?g|png)$/i)

