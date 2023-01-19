import { Expose } from "class-transformer";
import { IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { Property } from "../../enum/property.enum";
import { Size } from "../../const/api-options.const";
import { APIProp } from "../../utils/api.utils";

const { Quote, Author } = Property;
const { Min, Max } = Size;
const { Post } = APIProp

export class QuoteDTO {
  @Expose()
  @IsString()
  @Length(Min(Quote), Max(Quote))
  @ApiProperty(Post(Quote))
  public quote?: string;

  @Expose()
  @IsString()
  @Length(Min(Author), Max(Author))
  @ApiProperty(Post(Author))
  public author?: string;
}
