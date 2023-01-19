import { APIConfig } from "../enum/config.enum";
import { PortDefault } from "../enum/utils.enum";
import { getDocument } from "../utils/common.utils";

const { BlogTitle, BlogDesc, NotifyTitle, NotifyDesc, UsersTitle, UsersDesc } = APIConfig

export const APIPort = {
  Blog: process.env.API_PORT ?? PortDefault.BlogAPI,
  Notify: process.env.API_PORT ?? PortDefault.NotifyAPI,
  Users: process.env.API_PORT ?? PortDefault.UsersAPI
}

export const SwaggerConfig = {
  Blog: getDocument(BlogTitle, BlogDesc),
  Notify: getDocument(NotifyTitle, NotifyDesc),
  Users: getDocument(UsersTitle, UsersDesc)
}
