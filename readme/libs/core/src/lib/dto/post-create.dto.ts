import { Expose } from "class-transformer";
import { ValidateNested } from "class-validator";
import { ApiProperty, IntersectionType, PickType } from "@nestjs/swagger";

import { Link, PostDTO, Quote, Text, Video } from "@readme/core";

class PostContent {
  @Expose()
  @ValidateNested()
  @ApiProperty()
  public link?: Link;

  @Expose()
  @ValidateNested()
  @ApiProperty()
  public video?: Video;

  @Expose()
  @ValidateNested()
  @ApiProperty()
  public quote?: Quote;

  @Expose()
  @ValidateNested()
  @ApiProperty()
  public text?: Text;
}

export class PostCreateDTO extends IntersectionType(
  PickType(PostDTO, ['tags', 'type'] as const),
  PostContent,
) {}
