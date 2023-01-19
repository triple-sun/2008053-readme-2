import { Expose } from "class-transformer";
import { IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { APIProp, Property, Size } from "@readme/core";

const { Min, Max } = Size
const { Comment, Text } = Property

export class CommentCreateDTO {
  @Expose()
  @IsString()
  @MaxLength(Max(Comment))
  @MinLength(Min(Comment))
  @ApiProperty(APIProp.Comment(Text))
  public text: string;
}
