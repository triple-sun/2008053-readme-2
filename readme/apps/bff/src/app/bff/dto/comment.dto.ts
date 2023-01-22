import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { CommentProperty, Property, UserIDDTO, ValidateLength } from '@readme/core';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';
import mongoose, { ObjectId } from 'mongoose';
import { PageDTO } from './page.dto';
import { PostIDDTO } from './post/post.dto';

export class CommentIDDTO {
  @Expose()
  @IsInt()
  public commentID: number;
}

export class CommentDTO {
  @Expose()
  @IsString()
  public comment: string;
}

export class CommentFullDTO extends IntersectionType(
  CommentDTO,
  IntersectionType(PostIDDTO, UserIDDTO)
) {
  @ValidateLength()
  @ApiProperty(CommentProperty(Property.Comment))
  public comment: string

  @ApiProperty(CommentProperty(Property.Comment))
  @Type(() => mongoose.Types.ObjectId)
  public userId: ObjectId

  @Expose({ name: Property.Id })
  @ApiProperty(CommentProperty(Property.Comment))
  public postId: number
}

export class CommentsDTO extends IntersectionType(
  PostIDDTO,
  PageDTO
) {}

export class CommentRDO extends IntersectionType(CommentDTO, CommentIDDTO) {}

