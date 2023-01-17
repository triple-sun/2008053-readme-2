import { Expose } from "class-transformer";
import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { ValidateNested } from "class-validator";
import { PostTypeDTO } from "./post-type.dto";
import { PostTagsDTO } from "./post-tags.dto";
import { LinkDTO } from "./content/link.dto";
import { VideoDTO } from "./content/video.dto";
import { QuoteDTO } from "./content/quote.dto";
import { TextDTO } from "./content/text.dto";
import { PhotoDTO } from "./content/photo.dto";

class PostContent {
  @Expose()
  @ValidateNested()
  @ApiProperty()
  public link?: LinkDTO;

  @Expose()
  @ValidateNested()
  @ApiProperty()
  public video?: VideoDTO;

  @Expose()
  @ValidateNested()
  @ApiProperty()
  public quote?: QuoteDTO;

  @Expose()
  @ValidateNested()
  @ApiProperty()
  public text?: TextDTO;

  @Expose()
  @ApiProperty()
  @ValidateNested()
  public photo?: PhotoDTO
}

export class PostCreateDTO extends IntersectionType(
  IntersectionType(PostTypeDTO, PostTagsDTO),
  PostContent,
) {}
