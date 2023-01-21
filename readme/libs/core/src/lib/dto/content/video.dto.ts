import { Expose } from "class-transformer";
import { IsString, IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { Title, TitleDTO } from "./title.dto";
import { PostProperty } from "../../utils/api.utils";
import { Property } from "../../enum/property.enum";

const { VideoLink } = Property;

export class Video extends Title {
  @Expose()
  @IsString()
  public videoLink: string;
}

export class VideoDTO extends TitleDTO {
  @Expose()
  @IsUrl()
  @ApiProperty(PostProperty(VideoLink))
  public videoLink?: string;
}

export class VideoRDO extends Video {}

