import { IsOptional, IsString, IsUrl, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { Property } from "../../enum/property.enum";
import { Size } from "../../const/api-options.const";
import { APIProp } from "../../utils/api.utils";

const { Link, Desc } = Property;
const { Max } = Size;
const { Post } = APIProp

export class LinkDTO {
  @IsUrl()
  @ApiProperty(Post(Link))
  public link: string;

  @IsString()
  @IsOptional()
  @MaxLength(Max(Desc))
  @ApiProperty(Post(Link))
  public desc?: string;
}
