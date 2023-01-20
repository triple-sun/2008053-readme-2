import { APIConfig } from "../const/api.const";
import { getSwaggerDocument } from "../utils/common.utils";

const { Blog, Notify, Users } = APIConfig

export const SwaggerConfig = {
  Blog: getSwaggerDocument(Blog.Title, Blog.Desc),
  Notify: getSwaggerDocument(Notify.Title, Notify.Desc),
  Users: getSwaggerDocument(Users.Title, Users.Desc)
}
