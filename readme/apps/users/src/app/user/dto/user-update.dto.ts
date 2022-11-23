import { ApiProperty } from "@nestjs/swagger";
import { APIDesc, APIExample } from "../../auth/auth.enum";

export class UserUpdateDTO {
  @ApiProperty({
    description: APIDesc.Avatar,
    example: APIExample.Avatar
  })
  public avatar?: string;

  @ApiProperty({
    description: APIDesc.Pass,
    example: APIExample.Pass
  })
  public password?: string;

  @ApiProperty({
    description: APIDesc.Subs,
    example: APIExample.Subs
  })
  public subscriptions?: string[];
}
