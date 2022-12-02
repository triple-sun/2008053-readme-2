import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { RDOBase } from '@readme/shared-types';
import { Expose } from 'class-transformer';
import { PostCreateDTO } from '../dto/post-create.dto';
import { APIDesc, APIExample } from '../post.enum';

class PostRDOBase {
  @ApiProperty({
    description: APIDesc.Repost,
    example: APIExample.Bool
  })
  @Expose()
  public isRepost: boolean;

  @ApiProperty({
    description: APIDesc.AuthorID,
    example: APIExample.ID
  })
  @Expose()
  public authorID: string;

  @ApiProperty({
    description: APIDesc.OriginID,
    example: APIExample.ID
  })
  @Expose()
  public originID: string;
}

export class PostRDO extends IntersectionType(
  RDOBase,
  IntersectionType(
    PostRDOBase,
    PostCreateDTO
  )
) {}
