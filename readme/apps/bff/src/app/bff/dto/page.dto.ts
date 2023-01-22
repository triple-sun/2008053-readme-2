import { ApiPropertyOptional } from "@nestjs/swagger";
import { PostProperty, Property } from "@readme/core";
import { Expose, Transform } from "class-transformer";
import { IsNumber } from "class-validator";

export class PageDTO {
  @Expose()
  @IsNumber()
  @Transform(({value}) => +value)
  @ApiPropertyOptional(PostProperty(Property.Page))
  public page?: number;
}
