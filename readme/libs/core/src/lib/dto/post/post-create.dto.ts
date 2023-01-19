import { Expose } from "class-transformer";
import { IntersectionType } from "@nestjs/swagger";
import { ValidateNested } from "class-validator";
import { PostTypeDTO } from "./post-type.dto";
import { PostTagsDTO } from "./post-tags.dto";
import { LinkDTO } from "../content/link.dto";
import { VideoDTO } from "../content/video.dto";
import { QuoteDTO } from "../content/quote.dto";
import { TextDTO } from "../content/text.dto";
import { PhotoDTO } from "../content/photo.dto";

class PostContentDTO {
  @Expose()
  @ValidateNested()
  public link?: LinkDTO;

  @Expose()
  @ValidateNested()
  public video?: VideoDTO;

  @Expose()
  @ValidateNested()
  public quote?: QuoteDTO;

  @Expose()
  @ValidateNested()
  public text?: TextDTO;

  @Expose()
  @ValidateNested()
  public photo?: PhotoDTO
}

export class PostCreateDTO extends IntersectionType(
  IntersectionType(PostTypeDTO, PostTagsDTO),
  PostContentDTO,
) {}
