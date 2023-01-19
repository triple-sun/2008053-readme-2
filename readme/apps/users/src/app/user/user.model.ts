import mongoose, { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Collection, Property, Size } from '@readme/core';
import { IUser } from '@readme/shared-types';

@Schema({
  collection: Collection.Users,
  timestamps: true
})
export class UserModel extends mongoose.Document implements IUser {
  @Prop({
    default: ''
  })
  public avatar: string;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
    maxlength: Size.Max(Property.Name),
    minlength: Size.Min(Property.Name)
  })
  public name: string;

  @Prop({
    default: [],
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: UserModel.name }]
  })
  public subscriptions: Types.ObjectId[]

  @Prop({
    required: true,
  })
  public passwordHash: string;

  @Prop({
    default: new Date()
  })
  public notifiedAt: Date
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
