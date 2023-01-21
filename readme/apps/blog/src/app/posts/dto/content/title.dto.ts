import { ApiProperty } from "@nestjs/swagger";
import { PostProperty, Property, Size, ValidateLength } from "@readme/core";
import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class TitleRDO {
  @Expose()
  public title?: string;
}

export class TitleDTO extends TitleRDO {
  @Expose()
  @IsString()
  @ValidateLength()
  @ApiProperty(PostProperty(Property.Title, {minLength: Size.Title.Min, maxLength: Size.Title.Max}))
  public title: string;
}

