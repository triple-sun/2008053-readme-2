import { Expose } from "class-transformer";
import { IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { ContentAPIProp } from "../../api-props/post/content.api-prop";

export class Photo {
  @Expose()
  @IsString()
  @ApiProperty(ContentAPIProp.Photo)
  public photoLink: string;

  constructor(photoLink: string) {
    this.photoLink = photoLink;
  }
}
