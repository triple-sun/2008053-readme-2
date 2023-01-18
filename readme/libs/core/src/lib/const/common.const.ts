import { APIConfig } from "../enum/api.enum";
import { PortDefault } from "../enum/utils.enum";
import { getDocument } from "../utils/common.utils";

export const APIPort = {
  Blog: process.env.API_PORT ?? PortDefault.BlogAPI,
  Notify: process.env.API_PORT ?? PortDefault.NotifyAPI,
  Users: process.env.API_PORT ?? PortDefault.UsersAPI
}

export const SwaggerConfig = {
  Blog: getDocument(APIConfig.BlogTitle, APIConfig.BlogDesc),
  Notify: getDocument(APIConfig.NotifyTitle, APIConfig.NotifyDesc),
  Users: getDocument(APIConfig.UsersTitle, APIConfig.UsersDesc)
}
