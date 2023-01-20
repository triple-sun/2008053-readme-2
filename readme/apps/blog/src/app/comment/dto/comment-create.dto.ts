import { Expose } from "class-transformer";
import { IsString, } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { APIOption, Property, ValidateLength } from "@readme/core";

export class CommentCreateDTO {
  @Expose()
  @IsString()
  @ValidateLength()
  @ApiProperty(APIOption.Comment(Property.Comment))
  public comment: string;
}
