import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Prefix, Property } from '@readme/core';
import { IUser } from '@readme/shared-types';
import { Transform } from 'class-transformer';
import mongoose from 'mongoose';
import { FileSystemStoredFile } from 'nestjs-form-data';

type UserDocument = UserModel & Document

@Schema({
  collection: Prefix.Subscribers,
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true
  }
})
export class UserModel extends mongoose.Document implements IUser {
  @Transform(({value}) => value.toString())
  _id: string

  @Prop({ required: true, unique: true })
  public email: string;

  @Prop({ required: true })
  public name: string;

  @Prop({ required: true })
  public passwordHash: string;

  @Prop()
  public createdAt: Date

  @Prop({
    })
  public subscriptions: string[]

  @Prop({
  })
  public subscribers: string[]

  @Prop({
    type: () => FileSystemStoredFile
  })
  avatar: FileSystemStoredFile;

  public avatarLink?: string;
  public subscribersCount?: number;
  public userId: string;
}

const UserSchema = SchemaFactory.createForClass(UserModel)

UserSchema.virtual(Property.AvatarLink).get( function (this: UserDocument ) { return this.avatar ? this.avatar.path : ''})
UserSchema.virtual(Property.UserId).get( function (this: UserDocument ) { return this._id.toString()})
UserSchema.virtual(Property.SubscribersCount).get( function(this: UserDocument ) { this.subscribersCount = this.subscribers?.length ?? 0})

export { UserSchema }
