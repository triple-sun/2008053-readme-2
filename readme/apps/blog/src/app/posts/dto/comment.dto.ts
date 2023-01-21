import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { CommentProperty, Property, UserIDDTO, ValidateLength } from '@readme/core';
import { Expose } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';
import { PageDTO } from './page.dto';
import { PostIDDTO } from './post/post.dto';


export class CommentID {
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
  public userID: string

  @ApiProperty(CommentProperty(Property.Comment))
  public postID: number
}

export class CommentsDTO extends IntersectionType(
  PostIDDTO,
  PageDTO
) {}

export class CommentRDO extends IntersectionType(CommentDTO, CommentID) {}

