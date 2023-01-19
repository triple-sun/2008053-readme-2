import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { ArrayMaxSize, IsArray, IsOptional, IsString, Length } from "class-validator";
import { Size } from "../../const/api-options.const";
import { Property } from "../../enum/property.enum";
import { APIProp } from "../../utils/api.utils";

const { Tags, Tag } = Property;
const { Min, Max } = Size;
const { Post } = APIProp

export class PostTagsDTO {
  @Expose()
  @IsOptional({})
  @ArrayMaxSize(Max(Tags))
  @Transform(({ value }) => value ? [... new Set(value.map((tag: string) => tag.toLowerCase()))] : [])
  @Length(Min(Tag), Max(Tag), {each: true})
  @IsArray({})
  @IsString({each: true})
  @ApiProperty(Post(Tags))
  public tags?: string[];
}
