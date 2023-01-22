import { Expose } from "class-transformer";
import { IsString, ValidateIf } from "class-validator";
import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { PostProperty, Property, Size, ValidateLength } from "@readme/core";

import { TitleDTO } from "./title.dto";
import { ContentType } from "@prisma/client";

export class Text {
  public text: string;
  public ann: string;
}

export class TextDTO extends IntersectionType(Text, TitleDTO) {
  @Expose()
  @ValidateIf(o => o.type === ContentType.TEXT)
  @IsString()
  @ValidateLength()
  @ApiProperty(PostProperty(Property.Ann, {minLength: Size.Ann.Min, maxLength: Size.Ann.Max}))
  public ann: string;

  @Expose()
  @IsString()
  @ValidateLength()
  @ApiProperty(PostProperty(Property.Text, {minLength: Size.Ann.Min, maxLength: Size.Ann.Max}))
  public text: string;

  @ValidateIf(o => o.type === ContentType.LINK)
  public title: string
}
