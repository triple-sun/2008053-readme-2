import { registerAs } from "@nestjs/config"
import { Token } from "../enum/token.enum"

export const formDataConfig = registerAs(Token.FormData, () => ({
  upload: process.env.UPLOAD_DIR,
}))
