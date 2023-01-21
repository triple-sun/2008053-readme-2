import { ApiProperty } from "@nestjs/swagger";
import { APIOption, Property } from "@readme/core";
import { Expose } from "class-transformer";
import { IsMongoId } from "class-validator";

export class UserSubscribeDTO {
  @Expose()
  @IsMongoId()
  @ApiProperty(APIOption.User(Property.SubToID))
  public subToID: string;
}
