import { ApiProperty } from "@nestjs/swagger";
import { ContentType } from "@prisma/client";
import { Expose, Transform } from "class-transformer";
import { IsString } from "class-validator";
import { Property } from "../../enum/property.enum";
import { APIOption } from "../../utils/api.utils";
import { TransformOptions } from "../../utils/transform.utils";

export class PostTypeDTO {
  @Expose()
  @IsString()
  @Transform(TransformOptions.Type)
  @ApiProperty(APIOption.Post(Property.Type, { name: Property.Type, enum: ContentType }))
  public type?: ContentType;
}
