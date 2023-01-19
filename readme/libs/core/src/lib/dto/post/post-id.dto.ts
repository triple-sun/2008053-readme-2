import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { IsInt } from "class-validator";
import { Property } from "../../enum/property.enum";
import { APIProp } from "../../utils/api.utils";

export class PostIDDTO {
  @Expose()
  @IsInt()
  @Transform(({ value } ) => +value)
  @ApiProperty(APIProp.Post(Property.PostID))
  public postID: number;
}
