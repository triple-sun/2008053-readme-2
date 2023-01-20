import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsMongoId } from "class-validator";
import Property from "../../enum/property.enum";
import { APIOption } from "../../utils/api.utils";

export class PostAuthorIDDTO {
  @Expose()
  @IsMongoId()
  @ApiProperty(APIOption.Post(Property.AuthorID))
  public authorID: string;
}
