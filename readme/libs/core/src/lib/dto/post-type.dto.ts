import { ApiProperty } from "@nestjs/swagger";
import { ContentType } from "@prisma/client";
import { Expose, Transform } from "class-transformer";
import { IsString } from "class-validator";
import { PostAPIProp } from "../api-props/post/post.api-prop";
import { FieldName } from "../enum/field-name.enum";

export class PostTypeDTO {
  @Expose()
  @IsString()
  @Transform(({ value } ) => value.toString().toUpperCase())
  @ApiProperty(PostAPIProp[FieldName.Type])
  public type?: ContentType;
}
