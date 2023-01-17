import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { ArrayMaxSize, IsArray, IsOptional, IsString, Length } from "class-validator";
import { PostAPIProp } from "../api-props/post/post.api-prop";
import { MinMax } from "../enum/minmax.enum";

export class PostTagsDTO {
  @Expose()
  @IsOptional({})
  @Transform(({ value }) => console.log(value))
  @ArrayMaxSize(MinMax.TagsLimit)
  @Transform(({ value }) => value ? [... new Set(value.map((tag: string) => tag.toLowerCase()))] : [])
  @Length(MinMax.TagMin, MinMax.TagMax, {each: true})
  @IsArray({})
  @IsString({each: true})
  @ApiProperty(PostAPIProp.PostID)
  public tags?: string[];
}
