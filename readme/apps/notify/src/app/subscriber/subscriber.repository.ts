import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserSubscribeDTO } from '@readme/core';
import { ICRUDRepo, ISubscriber } from '@readme/shared-types';
import { Model } from 'mongoose';
import { SubscriberEntity } from './subscriber.entity';
import { SubscriberModel } from './subscriber.model';

@Injectable()
export class SubscriberRepository implements ICRUDRepo<SubscriberEntity, string, ISubscriber> {
  constructor(
    @InjectModel(SubscriberModel.name) private readonly subscriberModel: Model<SubscriberModel>
  ) {}

  public async create(item: SubscriberEntity): Promise<ISubscriber> {
    const newEmailSubscriber = new this.subscriberModel(item);
    return newEmailSubscriber.save();
  }

  public async destroy(id: string): Promise<void> {
    this.subscriberModel.deleteOne({ id });
  }

  public async findOne(id: string): Promise<ISubscriber | null> {
    return this.subscriberModel
        .findOne({ id })
        .exec();
  }

  public async update(id: string, item: SubscriberEntity): Promise<ISubscriber> {
    return this.subscriberModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }

  public async findByEmail(email: string): Promise<ISubscriber | null> {
    return this.subscriberModel
      .findOne({ email })
      .exec()
  }

  public async findByUserID(userID: string): Promise<ISubscriber | null> {
    return this.subscriberModel
      .findOne({ userID })
      .exec()
  }

  public async subscribe({userID, subToID}: UserSubscribeDTO): Promise<ISubscriber> {
    const isSubscribed = await this.subscriberModel.findOne({ _id: userID, subscriptions: { '$in': [subToID] }})

    return await this.subscriberModel
      .findByIdAndUpdate(userID, {[isSubscribed ? '$pull' : '$addToSet']: { subscriptions: subToID }}, { new: true })
      .exec()
  }

  public async updatePosts({userID, postID}) {
    const isInPosts = await this.subscriberModel.findOne({ _id: userID, posts: { '$in': [postID] }})

    return await this.subscriberModel
      .findByIdAndUpdate(userID, {[isInPosts ? '$pull' : '$addToSet']: { posts: postID }}, { new: true })
      .exec()  }
}
