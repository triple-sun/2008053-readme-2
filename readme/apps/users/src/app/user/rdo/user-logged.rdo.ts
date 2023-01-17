import { IntersectionType, PickType } from '@nestjs/swagger';
import { UserDTO } from '@readme/core';

import { UserRDO } from './user.rdo';

export class UserLoggedRDO extends IntersectionType(
  PickType(UserDTO, ['token'] as const),
  PickType(UserRDO, ['id', 'email'] as const)
) {}
