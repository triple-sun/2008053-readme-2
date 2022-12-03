import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MinMax } from '@readme/core';
import { Collection, ContentType, Post} from '@readme/shared-types';
import { Document, SchemaTypes } from 'mongoose';

@Schema({
  collection: Collection.Posts,
  discriminatorKey: 'contentType'
})

export class PostModel extends Document implements Post {
  @Prop({
    required: true,
    enum: ContentType,
    type: String
  })
  public contentType: ContentType;

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
    default: [],
  })
  public comments?: Comment[];

  @Prop({
    default: false
  })
  public isDraft: boolean;

  @Prop({
    default: false
  })
  public isRepost: boolean;

  @Prop({
    required: true
  })
  public userID?: string;

  @Prop()
  public authorID: string;

  @Prop({
    type: SchemaTypes.ObjectId
  })
  public originID: string;
}

export const PostSchema = SchemaFactory.createForClass(PostModel);
