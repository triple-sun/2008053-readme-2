import { IntersectionType, PickType } from '@nestjs/swagger';
import { UserRDO, UserTokenDTO } from '@readme/core';

export class UserLoggedRDO extends IntersectionType(
  UserTokenDTO,
  PickType(UserRDO, ['id', 'email'] as const)
) {}
