import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { ArrayMaxSize, IsInt, IsOptional, IsString, Length, Matches } from "class-validator";
import { PostAPIProp } from "../api-props/post/post.api-prop";
import { FieldName } from "../enum/field-name.enum";
import { MinMax } from "../enum/minmax.enum";
import { PostTypeDTO } from "./post-type.dto";

export class PostDTO {
  @Expose()
  @IsInt()
  @Transform(({ value } ) => +value)
  @ApiProperty(PostAPIProp[FieldName.PostID])
  public postID: number;

  @Expose()
  @IsOptional()
  @Transform(({ value }) => value.split(',').map((tag: string) => tag.toString()))
  @Length(MinMax.TagMin, MinMax.TagMax, {each: true})
  @ArrayMaxSize(MinMax.TagsLimit)
  @IsString({each: true})
  @Matches(/^[a-z]*[a-z][a-z0-9-._]*$/g, {each: true})
  @ApiProperty(PostAPIProp[FieldName.Tags])
  public tags?: string[];
}

export class Post extends IntersectionType(PostDTO, PostTypeDTO) {}
