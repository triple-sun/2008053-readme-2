import { Expose, Transform } from "class-transformer";
import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Property } from "../../enum/property.enum";
import { PostProperty } from "../../utils/api.utils";

export class Photo {
  @Expose()
  @IsString()
  public photoLink: string;
}

export class PhotoDTO extends Photo {
  @Expose({ name: Property.Avatar})
  @Transform(({ obj }) => obj.filepath)
  @IsString()
  @ApiProperty(PostProperty(Property.Photo))
  public photoLink: string;
}

export class PhotoRDO extends Photo {}
