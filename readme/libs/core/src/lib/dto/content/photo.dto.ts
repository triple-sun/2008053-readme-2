import { Transform } from "class-transformer";
import { IsDefined, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Property } from "../../enum/property.enum";
import { APIProp } from "../../utils/api.utils";

const { Photo } = Property;
const { Post } = APIProp

export class PhotoDTO {
  @IsDefined()
  @Transform(({ obj }) => obj.path)
  @IsString()
  @ApiProperty(Post(Photo))
  public photo: string;
}
