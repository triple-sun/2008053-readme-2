import { PartialType, PickType } from "@nestjs/swagger";
import { UserCreateDTO } from "./user-create.dto";

export class UserUpdateDTO extends PartialType(
  PickType(UserCreateDTO, ['avatar', 'password', 'avatar'] as const)
) {}
