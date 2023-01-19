import { registerAs } from "@nestjs/config"
import { AppName } from "../enum/app-name"

export const formDataConfig = registerAs(AppName.FormData, () => ({
  upload: process.env.UPLOAD_DIR,
}))
