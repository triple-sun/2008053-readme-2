import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ISubscriber } from '@readme/shared-types';
import { Collection } from '@readme/core';


@Schema({
  collection: Collection.Subscribers,
  timestamps: true,
})
export class SubscriberModel extends Document implements ISubscriber {
  @Prop()
  public email: string;

  @Prop()
  public name: string;

  @Prop()
  public userID: string;
}

export const SubscriberSchema = SchemaFactory.createForClass(SubscriberModel);
