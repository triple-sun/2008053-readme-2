import { ApiProperty } from "@nestjs/swagger";
import { MinMax } from "@readme/core";
import { APIDesc, APIExample } from "../../auth/auth.enum";

export class UserLoginDTO {
  @ApiProperty({
    description: APIDesc.Email,
    example: APIExample.Email
  })
  public email: string;

  @ApiProperty({
    description: APIDesc.Pass,
    example: APIExample.Pass,
    maxLength: MinMax.UserPassMax,
    minLength: MinMax.UserPassMin
  })
  public password: string;
}
