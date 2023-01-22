import mongoose, { Document, ObjectId } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ISub } from '@readme/shared-types';
import { Collection } from '@readme/core';

@Schema({
  collection: Collection.Subscribers,
  timestamps: true,
})
export class SubscriberModel extends Document implements ISub {
  @Prop({
    unique: true
  })
  public email: string;

  @Prop()
  public name: string;

  @Prop({ type: mongoose.SchemaTypes.ObjectId})
  public userId: ObjectId
}

export const SubscriberSchema = SchemaFactory.createForClass(SubscriberModel);
