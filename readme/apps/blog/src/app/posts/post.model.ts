import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MinMax } from '@readme/core';
import { Collection, Post} from '@readme/shared-types';
import { Document } from 'mongoose';
import { ContentType } from '../../../../../libs/shared-types/src/lib/content/content-type.const';

@Schema({
  collection: Collection.Posts,
  discriminatorKey: 'type'
})

export class PostModel extends Document implements Post {
  @Prop({
    type: String,
    required: true,
    enum: ContentType
  })
  public type: string;

  @Prop({
    type: () => [String],
    default: [],
    lowercase: true,
    minlength: MinMax.TagMin,
    maxlength: MinMax.TagMax,
    validate: {
      validator: (tags: string[]) => tags.length <= MinMax.TagsMax,
      message: `${MinMax.TagsMax} tags or less`
    }
  })
  public tags?: string[]

  @Prop({
    default: false
  })
  public isDraft: boolean;

  @Prop({
    default: false
  })
  public isRepost: boolean;

  @Prop()
  public userID?: string;

  @Prop()
  public authorID: string;

  @Prop()
  public originID: string;
}

export const PostSchema = SchemaFactory.createForClass(PostModel);
