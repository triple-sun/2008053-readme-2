import { Size } from "../utils/size.utils"

export const IncludeForPost = { comments: { take: Size.Comments.Max }}

export const TagRegExp = /^[a-z]*[a-z][a-z0-9-._]*$/g
export const YoutubeLinkRegExp = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/g

export const IMAGE_MIME_TYPES = ['image/jpeg', 'image/png']

export const RMQ_SERVICE = Symbol.for('RMQ_SERVICE')
