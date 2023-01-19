import { ApiProperty } from "@nestjs/swagger";
import { ContentType } from "@prisma/client";
import { Expose, Transform } from "class-transformer";
import { IsString } from "class-validator";
import { Property } from "../../enum/property.enum";
import { APIProp } from "../../utils/api.utils";

export class PostTypeDTO {
  @Expose()
  @IsString()
  @Transform(({ value } ) => value.toString().toUpperCase())
  @ApiProperty(APIProp.Post(Property.Type))
  public type?: ContentType;
}
