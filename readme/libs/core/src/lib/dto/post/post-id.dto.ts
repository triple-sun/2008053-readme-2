import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { IsInt } from "class-validator";
import { Property } from "../../enum/property.enum";
import { APIOption } from "../../utils/api.utils";
import { TransformOptions } from "../../utils/transform.utils";

export class PostIDDTO {
  @Expose()
  @IsInt()
  @Transform(TransformOptions.Number)
  @ApiProperty(APIOption.Post(Property.PostID))
  public postID: number;
}
