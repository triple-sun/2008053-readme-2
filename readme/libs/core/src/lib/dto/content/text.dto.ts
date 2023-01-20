import { Expose } from "class-transformer";
import { IsString } from "class-validator";
import { ApiProperty, IntersectionType } from "@nestjs/swagger";

import { TitleDTO } from "./title.dto";
import { Property } from "../../enum/property.enum";
import { APIOption } from "../../utils/api.utils";
import { ValidateLength } from "../../decorator/validate-length.decorator";

const { Ann, Text } = Property;
const { Post } = APIOption

class TextContent {
  @Expose()
  @IsString()
  @ValidateLength()
  @ApiProperty(Post(Ann))
  public ann?: string;

  @Expose()
  @IsString()
  @ValidateLength()
  @ApiProperty(Post(Text))
  public text?: string;
}

export class TextDTO extends IntersectionType(
  TitleDTO,
  TextContent
) {}
