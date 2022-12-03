import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MinMax } from '@readme/core';
import { Collection, Comment } from '@readme/shared-types';
import { Document } from 'mongoose';

@Schema({
  collection: Collection.Comments,
})

export class CommentModel extends Document implements Comment {
  @Prop({
    required: true,
    minlength: MinMax.CommentMin,
    maxlength: MinMax.CommentMax
  })
  public text!: string;

  @Prop({
    required: true
  })
  public postID: string

  @Prop({
    required: true
  })
  public userID: string;
}

export const CommentSchema = SchemaFactory.createForClass(CommentModel);
