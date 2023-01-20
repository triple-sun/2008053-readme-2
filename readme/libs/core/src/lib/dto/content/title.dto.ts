import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString } from "class-validator";

import { Property } from "../../enum/property.enum";
import { APIOption } from "../../utils/api.utils";
import { ValidateLength } from "../../decorator/validate-length.decorator";

const { Title } = Property;const { Post } = APIOption

export class TitleDTO {
  @Expose()
  @IsString()
  @ValidateLength()
  @ApiProperty(Post(Title))
  public title?: string;
}

