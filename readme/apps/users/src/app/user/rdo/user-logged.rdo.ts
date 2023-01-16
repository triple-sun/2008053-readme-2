import { IntersectionType, PickType } from '@nestjs/swagger';
import { UserData } from '@readme/core';

import { UserRDO } from './user.rdo';

export class UserLoggedRDO extends IntersectionType(
  PickType(UserData, ['token'] as const),
  PickType(UserRDO, ['id', 'email'] as const)
) {}
