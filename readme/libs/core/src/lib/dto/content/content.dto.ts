import { Expose } from "class-transformer";
import { ApiExtraModels, ApiProperty, ApiPropertyOptional, getSchemaPath } from "@nestjs/swagger";
import { ValidateIf, ValidateNested } from "class-validator";
import { LinkDTO } from "./link.dto";
import { VideoDTO } from "./video.dto";
import { QuoteDTO } from "./quote.dto";
import { TextDTO } from "./text.dto";
import { PhotoDTO } from "./photo.dto";
import { Property } from "../../enum/property.enum";
import { PostProperty } from "../../utils/api.utils";

const { Content } = Property

@ApiExtraModels(LinkDTO, VideoDTO, QuoteDTO, TextDTO, PhotoDTO)
export class ContentDTO {
  @Expose()
  @ValidateNested()
  @ApiProperty(PostProperty(Content, {
          oneOf:[
            { $ref: getSchemaPath(LinkDTO) },
            { $ref: getSchemaPath(QuoteDTO) },
            { $ref: getSchemaPath(PhotoDTO) },
            { $ref: getSchemaPath(TextDTO) },
            { $ref: getSchemaPath(VideoDTO) }
        ]}))
  public content: LinkDTO | VideoDTO | QuoteDTO | TextDTO | PhotoDTO

  @Expose()
  @ValidateIf(o => o.type)
  @ApiPropertyOptional({type: 'string', format: 'binary'})
  public photoLink: Express.Multer.File
}
