import { Expose } from "class-transformer";
import { IsOptional, IsString, IsUrl, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { ContentAPIProp } from "../../api-props/post/content.api-prop";
import { MinMax } from "../../enum/minmax.enum";
import { FieldName } from "../../enum/field-name.enum";

export class Link {
  @Expose()
  @IsUrl()
  @ApiProperty(ContentAPIProp[FieldName.Url])
  public link: string;

  @Expose()
  @IsString()
  @IsOptional()
  @MaxLength(MinMax.DescMax)
  @ApiProperty(ContentAPIProp[FieldName.Desc])
  public desc?: string;
}
