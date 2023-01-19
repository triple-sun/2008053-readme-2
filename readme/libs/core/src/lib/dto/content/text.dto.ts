import { Expose } from "class-transformer";
import { IsString, Length } from "class-validator";
import { ApiProperty, IntersectionType } from "@nestjs/swagger";

import { TitleDTO } from "./title.dto";
import { Property } from "../../enum/property.enum";
import { Size } from "../../const/api-options.const";
import { APIProp } from "../../utils/api.utils";

const { Ann, Text } = Property;
const { Min, Max } = Size;
const { Post } = APIProp

class TextContent {
  @Expose()
  @IsString()
  @Length(Min(Ann), Max(Ann))
  @ApiProperty(Post(Ann))
  public ann?: string;

  @Expose()
  @IsString()
  @Length(Min(Text), Max(Text))
  @ApiProperty(Post(Text))
  public text?: string;
}

export class TextDTO extends IntersectionType(
  TitleDTO,
  TextContent
) {}
