import { ApiProperty, IntersectionType, PartialType, PickType } from "@nestjs/swagger";
import { UserAPIDesc, UserAPIExample } from "@readme/shared-types";
import { Expose } from "class-transformer";
import { UserCreateDTO } from "./user-create.dto";

class UserUpdateDTOBase {
  @ApiProperty({
    description: UserAPIDesc.SubTo,
    example: UserAPIExample.ID,
    uniqueItems: true
  })
  @Expose()
  subscribeTo?: string;
}

export class UserUpdateDTO extends PartialType(
  IntersectionType(
    UserUpdateDTOBase,
    PickType(UserCreateDTO, ['avatarUrl', 'password'] as const)
  )
) {}
