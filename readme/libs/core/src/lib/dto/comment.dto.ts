import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { CommentProperty, PostRDO, Property, UserIDDTO, UserRDO, ValidateLength } from '@readme/core';
import { Expose } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';
import { PostIDDTO } from './post/post.dto';

export class CommentID {
  @Expose()
  @IsInt()
  public commentID: number;
}

export class Comment {
  @Expose()
  @IsString()
  public comment: string;
}

export class CommentDTO extends IntersectionType(
  Comment,
  IntersectionType(PostIDDTO, UserIDDTO)
) {
  @ValidateLength()
  @ApiProperty(CommentProperty(Property.Comment))
  public comment: string
}

export class CommentRDO extends IntersectionType(
  IntersectionType(Comment, PickType(UserRDO, ['userID'] as const)),
  IntersectionType(CommentID, PickType(PostRDO, ['postID'] as const))
) {}

