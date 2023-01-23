import { DocumentBuilder } from "@nestjs/swagger";
import { AppName, PortDefault } from "../enum/utils.enum";

const getSwaggerConfig = (title: string, desc: string, version: string) => new DocumentBuilder()
  .setTitle(title)
  .setDescription(desc)
  .setVersion(version)
  .addBearerAuth()
  .build()


const getAPIConfig = (name: AppName) => {
  const desc = `${name} service API`
  return {
    Name: name,
    Desc: desc,
    Port: process.env.API_PORT ?? PortDefault[name],
    Config: getSwaggerConfig(name, desc, '1.0')
}}

const APIConfig = {
  BffAPI: getAPIConfig(AppName.BFF),
  BlogAPI: getAPIConfig(AppName.Blog),
  NotifyAPI: getAPIConfig(AppName.Notify),
  UsersAPI: getAPIConfig(AppName.Users)
}

export const { BffAPI, BlogAPI, NotifyAPI, UsersAPI } = APIConfig

