import { ApiProperty } from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import { APIDesc, APIExample } from '../auth.enum';

export class UserSubRDO {
  @ApiProperty({
    description: APIDesc.Subs,
    example: APIExample.Subs
  })
  @Expose()
  public subscriptions: string[];
}
