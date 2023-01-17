import { Expose, Transform } from "class-transformer";
import { IsDefined, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { ContentAPIProp } from "../../api-props/post/content.api-prop";

export class PhotoDTO {
  @Expose()
  @IsDefined()
  @Transform(({ obj }) => obj.path)
  @IsString()
  @ApiProperty(ContentAPIProp.Photo)
  public photo: string;
}
