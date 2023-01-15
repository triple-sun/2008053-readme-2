import { MinMax } from "../enum/minmax.enum";

export const PostInclude = {
  comments: {
    take: MinMax.CommentsLimit,
  },
  origin: true,
  tags: true,
  link: true,
  photo: true,
  quote: true,
  text: true,
  video: true
}
