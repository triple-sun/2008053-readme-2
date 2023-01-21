import { IsOptional, IsString, IsUrl, MaxLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { Size } from "../../const/size.const";
import { LengthError } from "../../const/error.const";
import { Property } from "../../enum/property.enum";
import { PostProperty } from "../../utils/api.utils";
import { Expose } from "class-transformer";

const { WebLink, Desc } = Property;

export class Link {
  @Expose()
  @IsString()
  public webLink: string;

  @Expose()
  @IsString()
  public desc?: string;
}

export class LinkDTO extends Link {
  @IsUrl()
  @ApiProperty(PostProperty(WebLink))
  public webLink: string;

  @IsString()
  @IsOptional()
  @MaxLength(Size.Desc.Max, { message: LengthError })
  @ApiPropertyOptional(PostProperty(Desc))
  public desc?: string;
}

export class LinkRDO extends Link {}
