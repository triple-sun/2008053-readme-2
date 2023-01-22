import { Expose } from "class-transformer";
import { Matches, ValidateIf } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { Title, TitleDTO } from "./title.dto";
import { PostProperty, Property, YoutubeLinkRegExp } from "@readme/core";
import { ContentType } from "@prisma/client";

export class Video extends Title {
  public videoLink: string;
}

export class VideoDTO extends TitleDTO {
  @Expose()
  @ValidateIf(o => o.type === ContentType.VIDEO)
  @Matches(YoutubeLinkRegExp)
  @ApiProperty(PostProperty(Property.VideoLink))
  public videoLink?: string;

  @ValidateIf(o => o.type === ContentType.VIDEO)
  public title: string;
}

