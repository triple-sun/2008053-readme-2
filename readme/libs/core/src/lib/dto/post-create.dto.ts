import { Expose } from "class-transformer";
import { ValidateNested } from "class-validator";
import { ApiProperty, IntersectionType, PickType } from "@nestjs/swagger";
import { Link } from "../entity/content/link";
import { Video } from "../entity/content/video";
import { Quote } from "../entity/content/quote";
import { Post } from "../entity/post";
import { Text } from "../entity/content/text";


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
  PickType(Post, ['tags', 'type'] as const),
  PostContent,
) {}
