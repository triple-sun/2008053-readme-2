import { PickType } from "@nestjs/swagger";
import { UserDTO } from "@readme/core";

export class UserCreateDTO extends PickType(
  UserDTO, ['email', 'name', 'password'] as const) {}
