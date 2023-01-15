import { PartialType, PickType } from "@nestjs/swagger";
import { UserDTO } from "@readme/core";

export class UserUpdateDTO extends PartialType(
  PickType(
    UserDTO,
    ['avatarUrl', 'password'] as const
  )
) {}
