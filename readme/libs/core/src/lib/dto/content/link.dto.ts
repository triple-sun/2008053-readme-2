import { APIOption } from "../../utils/api.utils";
import { IsOptional, IsString, IsUrl, MaxLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { Property } from "../../enum/property.enum";
import { Size } from "../../const/size.const";
import { ErrorMessage } from "@readme/error";


const { Link } = Property;

export class LinkDTO {
  @IsUrl()
  @ApiProperty(APIOption.Post(Link))
  public link: string;

  @IsString()
  @IsOptional()
  @MaxLength(Size.Desc.Max, { message: ErrorMessage.Length })
  @ApiPropertyOptional(APIOption.Post(Link))
  public desc?: string;
}
