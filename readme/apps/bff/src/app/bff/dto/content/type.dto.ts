import { ApiProperty } from "@nestjs/swagger";
import { ContentType } from "@prisma/client";
import { PostProperty, Property } from "@readme/core";
import { Expose, Transform } from "class-transformer";

export class TypeDTO {
  @Expose()
  @Transform(({value}) => ContentType[value.toUpperCase()])
  @ApiProperty(PostProperty(Property.Type, {name: Property.Type, enum: ContentType }))
  public type: ContentType;
}
