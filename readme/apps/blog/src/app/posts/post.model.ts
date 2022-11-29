import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MinMax } from '@readme/core';
import { Collection, Post, ContentType, Content } from '@readme/shared-types';
import { Ref } from '@typegoose/typegoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema({
  collection: Collection.Posts,
})

export class PostModel extends Document implements Post {
  @Prop({required: true, enum: Object.values(ContentType), default: ContentType.Link})
  public type!: string;

  @Prop({type: SchemaTypes.ObjectId, refPath: 'type'})
  public content: Ref<Content>

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

  @Prop({
    required: true,
  })
  public userID: string;

  @Prop()
  public authorID: string;

  @Prop()
  public originID: string;
}

export const PostSchema = SchemaFactory.createForClass(PostModel);
