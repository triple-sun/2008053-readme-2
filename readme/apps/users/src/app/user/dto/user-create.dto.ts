import { ApiProperty } from "@nestjs/swagger";
import { MinMax } from "@readme/core";
import { APIDesc, APIExample } from "../../auth/auth.enum";

export class UserCreateDTO {
  @ApiProperty({
    description: APIDesc.Email,
    example: APIExample.Email
  })
  public email: string;

  @ApiProperty({
    description: APIDesc.Name,
    example: APIExample.Name,
    maxLength: MinMax.UserNameMax,
    minLength: MinMax.UserNameMin
  })
  public name: string;

  @ApiProperty({
    description: APIDesc.Pass,
    example: APIExample.Pass,
    maxLength: MinMax.UserPassMax,
    minLength: MinMax.UserPassMin
  })
  public password: string;
}
