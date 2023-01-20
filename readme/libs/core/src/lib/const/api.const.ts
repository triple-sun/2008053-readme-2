import { AppName } from "../enum/app-name";
import { getAPIConfig } from "../utils/api.utils";

export const APIConfig = {
  Blog:  getAPIConfig(AppName.Blog),
  Notify: getAPIConfig(AppName.Notify),
  Users: getAPIConfig(AppName.Users),
  Version: '1.0'
}
