import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { PostCreateDTO } from '@readme/shared-types';
import { Exclude, Expose } from 'class-transformer';
import { PostAPIDesc, PostAPIExample } from '@readme/shared-types';
import { ContentType } from '@prisma/client';

class PostRDOBase {
  @ApiProperty({
    description: PostAPIDesc.ID,
    example: PostAPIExample.ID
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: PostAPIDesc.ID,
    example: PostAPIExample.ID
  })
  @Exclude()
  public type: ContentType;

  @ApiProperty()
  @Expose()
  public commentIDs: number[];

  @ApiProperty({
    description: PostAPIDesc.Repost,
    example: PostAPIExample.Bool
  })
  @Expose()
  public isRepost: boolean;

  @ApiProperty({
    description: PostAPIDesc.Draft,
    example: PostAPIExample.Bool
  })
  @Expose()
  public isDraft: boolean;

  @ApiProperty({
    description: PostAPIDesc.AuthorID,
    example: PostAPIExample.ID
  })
  @Expose()
  public authorID: string;

  @ApiProperty({
    description: PostAPIDesc.OriginID,
    example: PostAPIExample.ID
  })
  @Expose()
  public originID: string;
}

export class PostRDO extends IntersectionType(
  PostCreateDTO,
  PostRDOBase,
) {}
