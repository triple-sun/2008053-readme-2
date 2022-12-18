import { Transform } from 'class-transformer';
import { Default} from '@readme/core';
import { IsInt, IsOptional, Max } from 'class-validator';

export class CommentQuery {
  @IsInt()
  public postID: number;

  @IsInt()
  @IsOptional()
  @Max(Default.CommentLimit)
  @Transform(({ value } ) => +value || Default.CommentLimit)
  public limit? = Default.PostLimit;
}
