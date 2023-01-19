import { Property } from "../enum/property.enum"
import { Size } from "./api-options.const"

export const PostInclude = {
  comments: {
    take: Size.Max(Property.Comments),
  }
}

export const TagRegExp = /^[a-z]*[a-z][a-z0-9-._]*$/g
export const imageExtRegExp = (/[/.](jpe?g|png)$/i)
