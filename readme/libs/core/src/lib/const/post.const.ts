import { MinMax } from "../enum/minmax.enum";

export const PostInclude = {
  comments: {
    take: MinMax.CommentsLimit,
  }
}
