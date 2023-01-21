import { Expose } from "class-transformer";
import { IsString } from "class-validator";
import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { PostProperty, Property, Size, ValidateLength } from "@readme/core";

import { TitleDTO } from "./title.dto";

export class TextRDO {
  @Expose()
  @IsString()
  public text: string;

  @Expose()
  @IsString()
  public ann: string;
}

export class TextDTO extends IntersectionType(TextRDO, TitleDTO) {
  @Expose()
  @IsString()
  @ValidateLength()
  @ApiProperty(PostProperty(Property.Ann, {minLength: Size.Ann.Min, maxLength: Size.Ann.Max}))
  public ann: string;

  @Expose()
  @IsString()
  @ValidateLength()
  @ApiProperty(PostProperty(Property.Text, {minLength: Size.Ann.Min, maxLength: Size.Ann.Max}))
  public text: string;
}
