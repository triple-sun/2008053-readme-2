import { ApiProperty } from "@nestjs/swagger";
import { ContentType } from "@prisma/client";
import { Expose } from "class-transformer";
import { ArrayMaxSize, IsArray, IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { PostAPIProp } from "../api-props/post/post.api-prop";
import { FieldName } from "../enum/field-name.enum";
import { MinMax } from "../enum/minmax.enum";

export class PostDTO {
  @Expose()
  @IsInt()
  @ApiProperty(PostAPIProp[FieldName.PostID])
  public postID: number;

  @Expose()
  @IsEnum(ContentType)
  @ApiProperty(PostAPIProp[FieldName.Type])
  public type: ContentType;

  @Expose()
  @IsOptional()
  @IsArray({each: true})
  @ArrayMaxSize(MinMax.TagsLimit)
  @IsString()
  @ApiProperty(PostAPIProp[FieldName.Tags])
  public tags?: string[];
}
