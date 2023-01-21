import { Expose, Transform } from "class-transformer";
import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { PostProperty, Property } from "@readme/core";

export class PhotoRDO {
  @Expose()
  @IsString()
  public photoLink: string;
}

export class PhotoDTO extends PhotoRDO {
  @Expose({ name: Property.Avatar})
  @Transform(({ obj }) => obj.filepath)
  @IsString()
  @ApiProperty(PostProperty(Property.Photo))
  public photoLink: string;
}
