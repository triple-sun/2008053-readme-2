import { Expose } from "class-transformer";
import { IsString, IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { TitleRDO, TitleDTO } from "./title.dto";
import { PostProperty, Property } from "@readme/core";

export class VideoRDO extends TitleRDO {
  @Expose()
  @IsString()
  public videoLink: string;
}

export class VideoDTO extends TitleDTO {
  @Expose()
  @IsUrl()
  @ApiProperty(PostProperty(Property.VideoLink))
  public videoLink?: string;
}

