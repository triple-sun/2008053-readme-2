import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString, Length } from "class-validator";
import { ContentAPIProp } from "../../api-props/post/content.api-prop";
import { FieldName } from "../../enum/field-name.enum";
import { MinMax } from "../../enum/minmax.enum";

export class TitleDTO {
  @Expose()
  @IsString()
  @Length(MinMax.TitleMin, MinMax.TitleMax)
  @ApiProperty(ContentAPIProp[FieldName.Title])
  public title?: string;
}

