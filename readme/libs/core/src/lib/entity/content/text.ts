import { Expose } from "class-transformer";
import { IsString, Length } from "class-validator";
import { ApiProperty, IntersectionType } from "@nestjs/swagger";

import { Title } from "./title";
import { ContentAPIProp } from "../../api-props/post/content.api-prop";
import { MinMax } from "../../enum/minmax.enum";
import { FieldName } from "../../enum/field-name.enum";

class TextContent {
  @Expose()
  @IsString()
  @Length(MinMax.AnnMin, MinMax.AnnMax)
  @ApiProperty(ContentAPIProp[FieldName.Ann])
  public ann?: string;

  @Expose()
  @IsString()
  @Length(MinMax.TextMin, MinMax.TextMax)
  @ApiProperty(ContentAPIProp[FieldName.Text])
  public text?: string;
}

export class Text extends IntersectionType(
  Title,
  TextContent
) {}
