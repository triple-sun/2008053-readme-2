import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString, Length } from "class-validator";

import { Property } from "../../enum/property.enum";
import { Size } from "../../const/api-options.const";
import { APIProp } from "../../utils/api.utils";

const { Title } = Property;
const { Min, Max } = Size;
const { Post } = APIProp

export class TitleDTO {
  @Expose()
  @IsString()
  @Length(Min(Title), Max(Title))
  @ApiProperty(Post(Title))
  public title?: string;
}

