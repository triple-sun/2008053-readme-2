import { IsOptional, IsUrl, MaxLength, ValidateIf } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { LengthError, PostProperty, Property, Size } from "@readme/core";
import { ContentType } from "@prisma/client";
import { TypeDTO } from "./type.dto";

export class Link extends TypeDTO {
  public webLink: string;

  @IsOptional()
  public desc?: string;
}

export class LinkDTO {
  @Expose()
  @ValidateIf(o => o.type === ContentType.LINK)
  @MaxLength(Size.Desc.Max, { message: LengthError })
  @ApiPropertyOptional(PostProperty(Property.Desc, { default: '' }))
  public desc?: string;

  @Expose()
  @IsUrl()
  @ValidateIf(o => o.type === ContentType.LINK)
  @ApiProperty(PostProperty(Property.WebLink))
  public webLink: string;
}
