import { Expose } from "class-transformer";
import { IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { ContentAPIProp } from "../../api-props/post/content.api-prop";
import { MinMax } from "../../enum/minmax.enum";
import { FieldName } from "../../enum/field-name.enum";

export class QuoteDTO {
  @Expose()
  @IsString()
  @Length(MinMax.QuoteMin, MinMax.QuoteMax)
  @ApiProperty(ContentAPIProp[FieldName.Quote])
  public quote?: string;

  @Expose()
  @IsString()
  @Length(MinMax.AuthorMin, MinMax.AuthorMax)
  @ApiProperty(ContentAPIProp[FieldName.Author])
  public author?: string;
}
