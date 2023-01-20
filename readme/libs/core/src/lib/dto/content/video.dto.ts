import { Expose } from "class-transformer";
import { IsUrl } from "class-validator";
import { ApiProperty, IntersectionType } from "@nestjs/swagger";

import { Property } from "../../enum/property.enum";
import { TitleDTO } from "./title.dto";
import { APIOption } from "../../utils/api.utils";

const { VideoLink } = Property;
const { Post } = APIOption

class VideoContent {
  @Expose()
  @IsUrl()
  @ApiProperty(Post(VideoLink))
  public videoLink?: string;
}

export class VideoDTO extends IntersectionType(
  TitleDTO,
  VideoContent
) {}

