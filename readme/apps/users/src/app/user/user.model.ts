import mongoose, { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Collection, MinMax } from '@readme/core';
import { IUser } from '@readme/shared-types';

@Schema({
  collection: Collection.Users,
  timestamps: true
})
export class UserModel extends mongoose.Document implements IUser {
  @Prop({
    default: ''
  })
  public avatarUrl: string;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
    maxlength: MinMax.UserNameMax,
    minlength: MinMax.UserNameMin
  })
  public name: string;

  @Prop({
    default: [],
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: UserModel.name }]
  })
  public subscriptions: Types.ObjectId[]

  @Prop({
    default: [],
  })
  public posts: number[];

  @Prop({
    required: true,
  })
  public passwordHash: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
