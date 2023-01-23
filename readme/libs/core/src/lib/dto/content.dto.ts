import { ContentType } from "@prisma/client";
import { IsOptional, ValidateIf } from "class-validator";
import { FileSystemStoredFile } from "nestjs-form-data";

export class Photo {
  @ValidateIf(o => o.type === ContentType.PHOTO)
  public photo?: FileSystemStoredFile
  public photoLink?: string;
}

export class Link {
    @ValidateIf(o => o.type === ContentType.LINK)
  public webLink?: string;

  @IsOptional()
  @ValidateIf(o => o.type === ContentType.LINK)
  public desc?: string;
}

export class Quote {
  @ValidateIf(o => o.type === ContentType.QUOTE)
  public author?: string;

  @ValidateIf(o => o.type === ContentType.QUOTE)
  public quote?: string;
}

export class Text {
  @ValidateIf(o => o.type === ContentType.TEXT)
  public text?: string;

  @ValidateIf(o => o.type === ContentType.TEXT)
  public ann?: string;
}

export class Title {
  @ValidateIf(o => o.type === (ContentType.VIDEO || ContentType.TEXT))
  public title?: string;
}

export class Video {
  @ValidateIf(o => o.type === ContentType.PHOTO)
  public videoLink?: string;
}

