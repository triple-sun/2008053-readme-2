import { ApiPropertyOptional, PickType } from "@nestjs/swagger";
import { ContentType } from "@prisma/client";
import { IMAGE_MIME_TYPES, PostProperty, Property } from "@readme/core";
import { Expose, Transform } from "class-transformer";
import {  ValidateIf } from "class-validator";
import { FileSystemStoredFile, HasMimeType, IsFile, MaxFileSize } from "nestjs-form-data";

export class Photo {
  public photo: FileSystemStoredFile
  public photoLink: string;
}

export class PhotoDTO extends PickType(Photo, ['photo']) {
  @ValidateIf(o => o.type === ContentType.PHOTO)
  @IsFile()
  @MaxFileSize(1e6)
  @HasMimeType(IMAGE_MIME_TYPES)
  @ApiPropertyOptional(PostProperty(Property.Avatar, {type: 'string', format: 'binary'}))
  @Transform(({obj, value}) => obj.photoLink = value.path)
  public photo: FileSystemStoredFile

  @Expose()
  @ValidateIf(o => o.type === ContentType.PHOTO)
  @Transform(({obj}) => obj.photoLink = obj.photo.path)
  public photoLink: string;
}
