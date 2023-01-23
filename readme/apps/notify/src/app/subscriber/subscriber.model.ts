import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ISub } from '@readme/shared-types';
import { Prefix } from '@readme/core';
import { Transform } from 'class-transformer';
import mongoose from 'mongoose';

@Schema({
  collection: Prefix.Subscribers,
  timestamps: true,
})
export class SubscriberModel extends mongoose.Document implements ISub {
  @Transform(({value}) => value.toString())
  _id: string

  @Prop({ unique: true })
  public email: string;

  @Prop()
  public name: string;

  @Prop({ default: new Date() })
  public notifiedAt: Date

  @Prop()
  public userId: string
}

export const SubscriberSchema = SchemaFactory.createForClass(SubscriberModel);
