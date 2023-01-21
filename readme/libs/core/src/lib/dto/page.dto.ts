import { ApiPropertyOptional } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { IsNumber } from "class-validator";
import { Property } from "../enum/property.enum";
import { PostProperty } from "../utils/api.utils";

export class PageDTO {
  @Expose()
  @IsNumber()
  @Transform(({value}) => +value)
  @ApiPropertyOptional(PostProperty(Property.Page))
  public page?: number;
}
