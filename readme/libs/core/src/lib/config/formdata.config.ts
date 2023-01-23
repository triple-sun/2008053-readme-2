import { ConfigModule, ConfigService, registerAs } from "@nestjs/config"
import { AppName, Upload } from "../enum/utils.enum"
import { FileSystemStoredFile } from 'nestjs-form-data'
import { Size } from "../utils/size.utils"
import { capitalize } from "../utils/common.utils"
import { FormDataInterceptorConfig, NestjsFormDataAsyncOptions } from "nestjs-form-data/dist/interfaces"

export const formDataConfig = registerAs(AppName.FormData, () => ({
  upload: process.env.UPLOAD_DIR,
}))

export const getFormDataConfig = (type: Upload): NestjsFormDataAsyncOptions => ({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService): Promise<FormDataInterceptorConfig>  => {
    return {
      storage: FileSystemStoredFile,
      fileSystemStoragePath: configService.get<string>(`${AppName.FormData}.upload`),
      autoDeleteFile: false,
      isGlobal: true,
      limits: {
        fileSize: Size[capitalize(type)].Max,
      }
    }},
  inject: [ConfigService]
})
