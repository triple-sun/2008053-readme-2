import { IsOptional, IsString, IsUrl, MaxLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { LengthError, PostProperty, Property, Size } from "@readme/core";

export class LinkRDO {
  @Expose()
  @IsString()
  public webLink: string;

  @Expose()
  @IsString()
  public desc?: string;
}

export class LinkDTO extends LinkRDO {
  @IsUrl()
  @ApiProperty(PostProperty(Property.WebLink, {}))
  public webLink: string;

  @IsString()
  @IsOptional()
  @MaxLength(Size.Desc.Max, { message: LengthError })
  @ApiPropertyOptional(PostProperty(Property.Desc, {}))
  public desc?: string;
}

