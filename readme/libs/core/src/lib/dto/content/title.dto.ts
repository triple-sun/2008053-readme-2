import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString } from "class-validator";
import { Size } from "../../const/size.const";
import { ValidateLength } from "../../decorator/validate-length.decorator";
import { Property } from "../../enum/property.enum";
import { PostProperty } from "../../utils/api.utils";

export class Title {
  @Expose()
  @IsString()
  public title: string;
}

export class TitleDTO {
  @Expose()
  @IsString()
  @ValidateLength()
  @ApiProperty(PostProperty(Property.Title, {minLength: Size.Title.Min, maxLength: Size.Title.Max}))
  public title: string;
}

export class TitleRDO extends Title {}

