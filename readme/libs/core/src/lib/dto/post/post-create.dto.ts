import { Expose } from "class-transformer";
import { ApiExtraModels, ApiProperty, getSchemaPath, IntersectionType } from "@nestjs/swagger";
import { ValidateNested } from "class-validator";
import { PostTagsDTO } from "./post-tags.dto";
import { LinkDTO } from "../content/link.dto";
import { VideoDTO } from "../content/video.dto";
import { QuoteDTO } from "../content/quote.dto";
import { TextDTO } from "../content/text.dto";
import { PhotoDTO } from "../content/photo.dto";
import { Property } from "../../enum/property.enum";
import { APIOption } from "../../utils/api.utils";

const { Post } = APIOption
const { Content } = Property

@ApiExtraModels(LinkDTO, VideoDTO, QuoteDTO, TextDTO, PhotoDTO)
class PostContentDTO {
  @Expose()
  @ValidateNested()
  @ApiProperty(Post(Content, {
          oneOf:[
            { $ref: getSchemaPath(LinkDTO) },
            { $ref: getSchemaPath(QuoteDTO) },
            { $ref: getSchemaPath(PhotoDTO) },
            { $ref: getSchemaPath(TextDTO) },
            { $ref: getSchemaPath(VideoDTO) }
        ]}))
  public content: LinkDTO | VideoDTO | QuoteDTO | TextDTO | PhotoDTO
}

export class PostCreateDTO extends IntersectionType(
  PostTagsDTO,
  PostContentDTO,
) {}
