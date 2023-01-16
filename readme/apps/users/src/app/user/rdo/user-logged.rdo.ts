import { IntersectionType, PickType } from '@nestjs/swagger';
import { User } from '@readme/core';

import { UserRDO } from './user.rdo';

export class UserLoggedRDO extends IntersectionType(
  PickType(User, ['token'] as const),
  PickType(UserRDO, ['id', 'email'] as const)
) {}
