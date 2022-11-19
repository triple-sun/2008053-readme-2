import { ApiProperty } from "@nestjs/swagger";
import { APIDesc, APIExample } from "../auth.enum";

export class UserUpdateDTO {
  @ApiProperty({
    description: APIDesc.ID,
    example: APIExample.ID
  })
  public id: string;

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
}
