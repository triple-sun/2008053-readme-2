import { ApiProperty } from '@nestjs/swagger';
import { Post } from '@readme/shared-types';
import {Expose} from 'class-transformer';
import { APIDesc, APIExample } from '../post.enum';

export class PostFeedRDO {
  @ApiProperty({
    description: APIDesc.Feed,
    example: APIExample.Feed,
    required: true
  })
  @Expose()
  public posts: Post[];
}
