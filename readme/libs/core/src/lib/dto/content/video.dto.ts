import { Expose } from "class-transformer";
import { IsUrl } from "class-validator";
import { ApiProperty, IntersectionType } from "@nestjs/swagger";

import { ContentAPIProp } from "../../api-props/post/content.api-prop";
import { FieldName } from "../../enum/field-name.enum";
import { TitleDTO } from "./title.dto";

class VideoContent {
  @Expose()
  @IsUrl()
  @ApiProperty(ContentAPIProp[FieldName.VideoUrl])
  public videoLink?: string;
}

export class VideoDTO extends IntersectionType(
  TitleDTO,
  VideoContent
) {}

