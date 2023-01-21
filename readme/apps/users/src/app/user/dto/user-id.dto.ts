import { ApiProperty } from "@nestjs/swagger";
import { APIOption, Property } from "@readme/core";
import { Expose } from "class-transformer";

export class UserIDDTO {
  @Expose()
  @ApiProperty(APIOption.User(Property.UserID))
  public id?: string;
}
