import { ApiProperty } from "@nestjs/swagger";
import { KeyName } from "@readme/core";
import { Expose } from "class-transformer";
import { UserAPIDesc, UserAPIExample } from "../api.enum";

export class RDOBase {
  @ApiProperty({
    description: UserAPIDesc.ID,
    example: UserAPIExample.ID
  })
  @Expose({ name: KeyName.ObjectID})
  public id: string;
}
