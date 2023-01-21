import { Expose } from "class-transformer";
import { IsString } from "class-validator";
import { ApiProperty, IntersectionType } from "@nestjs/swagger";

import { Title, TitleDTO } from "./title.dto";
import { ValidateLength } from "../../decorator/validate-length.decorator";
import { PostProperty } from "../../utils/api.utils";
import { Property } from "../../enum/property.enum";
import { Size } from "../../const/size.const";

class Text extends Title {
  @Expose()
  @IsString()
  public text: string;

  @Expose()
  @IsString()
  public ann: string;
}

export class TextDTO extends TitleDTO {
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

export class TextRDO extends Text {}
