import { ApiProperty } from "@nestjs/swagger";
import { APIDesc, APIExample } from "../../auth/auth.enum";

export class UserLoginDTO {
  @ApiProperty({
    description: APIDesc.Email,
    example: APIExample.Email
  })
  public email: string;

  @ApiProperty({
    description: APIDesc.Pass,
    example: APIExample.Pass
  })
  public password: string;
}
