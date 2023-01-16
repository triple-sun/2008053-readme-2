import { Expose } from "class-transformer";
import { IsUrl } from "class-validator";
import { ApiProperty, IntersectionType } from "@nestjs/swagger";

import { ContentAPIProp } from "../../api-props/post/content.api-prop";
import { FieldName } from "../../enum/field-name.enum";
import { Title } from "./title";

class VideoContent {
  @Expose()
  @IsUrl()
  @ApiProperty(ContentAPIProp[FieldName.VideoUrl])
  public videoLink?: string;
}

export class Video extends IntersectionType(
  Title,
  VideoContent
) {}

