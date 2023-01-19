import { Property } from "../enum/property.enum"
import { Entity } from "../enum/utils.enum"

const {Tag, Title, Ann, Text, Quote, Author, Desc, Name, Pass, Comment, Port, Avatar, Photo, Tags, Comments, Query, Search, Link, VideoLink, Type, UserID, PostID, Email, SubToID, Password} = Property
type TConstraintsProps = typeof Tag | typeof Title | typeof Ann | typeof Text | typeof Quote | typeof Author | typeof Desc | typeof Name | typeof Pass | typeof Comment | typeof Port | typeof Avatar | typeof Photo | typeof Tags | typeof Comments | typeof Query | typeof Search

export const Required = {
  [Entity.Post]: [Link, Photo, Quote, Author, Title, Ann, Text, VideoLink, Type, UserID],
  [Entity.Comment]: [Comment, PostID, UserID],
  [Entity.User]: [Email, Name, UserID, SubToID, Password]
}

export const Constraints: Record<TConstraintsProps, readonly number[]> = {
  [Tag]: [10, 3] as const,
  [Title]: [50, 20] as const,
  [Ann]: [255, 50] as const,
  [Text]: [1024, 300] as const,
  [Quote]: [300, 20] as const,
  [Author]: [50, 3] as const,
  [Desc]: [300] as const,
  [Name]: [50, 3] as const,
  [Pass]: [12, 6] as const,
  [Comment]: [300, 10] as const,
  [Comments]: [50] as const,
  [Port]: [65535, 0] as const,
  [Avatar]: [500000] as const,
  [Photo]: [1000000] as const,
  [Tags]: [8] as const,
  [Comments]: [50] as const,
  [Query]: [25] as const,
  [Search]: [20] as const
}

export const Size = {
  Max: (prop)  => Constraints[prop][0],
  Min: (prop)  => Constraints[prop][1]
}
