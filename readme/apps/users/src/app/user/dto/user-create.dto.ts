import { ApiProperty } from "@nestjs/swagger";
import { APIDesc, APIExample } from "../../auth/auth.enum";

export class UserCreateDTO {
  @ApiProperty({
    description: APIDesc.Email,
    example: APIExample.Email
  })
  public email: string;

  @ApiProperty({
    description: APIDesc.Name,
    example: APIExample.Name
  })
  public name: string;

  @ApiProperty({
    description: APIDesc.Pass,
    example: APIExample.Pass
  })
  public password: string;
}
