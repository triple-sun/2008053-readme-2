import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { ArrayMaxSize, IsArray, IsInt, IsOptional, IsString } from "class-validator";
import { PostAPIProp } from "../api-props/post/post.api-prop";
import { FieldName } from "../enum/field-name.enum";
import { MinMax } from "../enum/minmax.enum";
import { PostType } from "./post-type";

export class PostBase {
  @Expose()
  @IsInt()
  @ApiProperty(PostAPIProp[FieldName.PostID])
  public postID: number;

  @Expose()
  @IsOptional()
  @IsArray({each: true})
  @ArrayMaxSize(MinMax.TagsLimit)
  @IsString()
  @ApiProperty(PostAPIProp[FieldName.Tags])
  public tags?: string[];
}

export class Post extends IntersectionType(PostBase, PostType) {}
