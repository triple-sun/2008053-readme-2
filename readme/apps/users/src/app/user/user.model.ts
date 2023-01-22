import mongoose, { ObjectId } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Collection, Property } from '@readme/core';
import { IUser } from '@readme/shared-types';
import { Transform, Type } from 'class-transformer';
import { FileSystemStoredFile } from 'nestjs-form-data';

type UserDocument = UserModel & Document

@Schema({
  collection: Collection.Users,
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true
  }
})
export class UserModel extends mongoose.Document implements IUser {
  @Transform(({value}) => value.toString())
  _id: ObjectId

  @Prop({ required: true, unique: true })
  public email: string;

  @Prop({ required: true })
  public name: string;

  @Prop({ required: true })
  public passwordHash: string;

  @Prop({ default: new Date() })
  public notifiedAt: Date

  @Prop()
  public createdAt: Date

  @Prop({
    type: mongoose.SchemaTypes.ObjectId
    })
  @Type(() => mongoose.SchemaTypes.ObjectId)
  public subscriptions: ObjectId[]

  @Prop({
    type: mongoose.SchemaTypes.ObjectId
  })
  @Type(() => mongoose.SchemaTypes.ObjectId)
  public subscribers: ObjectId[]

  @Prop({
    type: () => FileSystemStoredFile
  })
  avatar: FileSystemStoredFile;

  public avatarLink?: string;
  public subscribersCount?: number
}

const UserSchema = SchemaFactory.createForClass(UserModel)

UserSchema.virtual(Property.AvatarLink).get( function (this: UserDocument ) { return this.avatar ? this.avatar.path : ''})
UserSchema.virtual(Property.SubscribersCount).get( function(this: UserDocument ) { this.subscribersCount = this.subscribers?.length ?? 0})

export { UserSchema }
