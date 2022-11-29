import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MinMax } from '@readme/core';
import { Collection, User } from '@readme/shared-types';
import { Document } from 'mongoose';

@Schema({
  collection: Collection.Users,
})

export class UserModel extends Document implements User {
  @Prop()
  public avatar: string;

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

  @Prop()
  public subscriptions: string[];

  @Prop({
    required: true,
  })
  public passwordHash: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
