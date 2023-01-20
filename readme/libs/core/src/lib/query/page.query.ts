import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

import { Property } from "../enum/property.enum";
import { APIOption } from "../utils/api.utils";

export class PageQuery {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => +value)
  @ApiProperty(APIOption.Post(Property.Page))
  public page?: number;
}
