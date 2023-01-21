import { Logger } from "@nestjs/common"
import { ApiPropertyOptions } from "@nestjs/swagger"
import { AppInfo } from "../enum/info.enum"
import { Property } from "../enum/property.enum"
import { AppName, Entity, Prefix } from "../enum/utils.enum"
import { getOptions } from "./schema.utils"

export const logAppRunning = (appName: AppName, port: string | number) => Logger.log(
  `🚀 ${appName} ${AppInfo.Running} http://localhost:${port}/${Prefix.Global}`
)

export const UserProperty = (prop: Property, options?: ApiPropertyOptions) => getOptions(Entity.User, prop, options)
export const CommentProperty = (prop: Property, options?: ApiPropertyOptions) => getOptions(Entity.Comment, prop, options)
export const PostProperty = (prop: Property, options?: ApiPropertyOptions) => getOptions(Entity.Post, prop, options)
export const SubProperty = (prop: Property, options?: ApiPropertyOptions) => getOptions(Entity.Subscriber, prop, options)
