import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ApiConsumes } from '@nestjs/swagger';
import { UploadType } from '../enum/utils.enum';
import { getStorageOptions } from '../utils/common.utils';

export const APIFile = (
  fieldName = UploadType.Avatar || UploadType.Photo,
  localOptions?: MulterOptions,
) =>  {
  return applyDecorators(
    UseInterceptors(FileInterceptor(fieldName, {...getStorageOptions(fieldName), ...localOptions})),
    ApiConsumes('multipart/form-data'),
  );
}
