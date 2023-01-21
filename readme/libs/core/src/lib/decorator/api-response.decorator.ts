import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiBodyOptions, ApiConsumes, ApiResponseMetadata } from '@nestjs/swagger';
import { AppInfo } from '../enum/info.enum';
import { Consumes } from '../enum/utils.enum';
import { FileOptions } from '../type/options.type';
import { getStorageOptions } from '../utils/common.utils';
import { Conflict, Forbidden, getCustomDecorators, NotFound, UnAuth, Internal } from '../utils/decorator.utils';


export const FileDecorators = ({fieldName, localOptions}: FileOptions) => (
  UseInterceptors(
    FileInterceptor(fieldName, {
      ...getStorageOptions(fieldName),
      ...localOptions
    }))
)

export const APICreateOrUpdate = (metadata: ApiResponseMetadata, file?: FileOptions, body?: ApiBodyOptions) => {
  return getCustomDecorators(
  metadata,
  UnAuth, Forbidden, Conflict,
  ApiConsumes(Consumes.FormData),
  file ? FileDecorators(file) : null,
  metadata.description === AppInfo.Updated ? NotFound : null,
  body ? ApiBody(body) : null
)}

export const APIFind = (metadata: ApiResponseMetadata) =>  {
  return getCustomDecorators(metadata, NotFound, UnAuth)
}


export const APIIndex = (metadata: ApiResponseMetadata) =>  {
  return getCustomDecorators(metadata)
}

export const APILogin = (metadata: ApiResponseMetadata) =>  {
  return getCustomDecorators(metadata, UnAuth, Internal, ApiConsumes(Consumes.FormData))
}
