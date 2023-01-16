import { ApiProperty } from "@nestjs/swagger";
import { ContentType } from "@prisma/client";
import { Expose } from "class-transformer";
import { IsEnum } from "class-validator";
import { PostAPIProp } from "../api-props/post/post.api-prop";
import { FieldName } from "../enum/field-name.enum";

export class PostType {
  @Expose()
  @IsEnum(ContentType)
  @ApiProperty(PostAPIProp[FieldName.Type])
  public type?: ContentType;
}
