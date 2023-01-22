import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ICRUDRepo, ISub } from '@readme/shared-types';
import { Model } from 'mongoose';
import { SubscriberEntity } from './subscriber.entity';
import { SubscriberModel } from './subscriber.model';

@Injectable()
export class SubscriberRepository implements ICRUDRepo<SubscriberEntity, string, ISub> {
  constructor(
    @InjectModel(SubscriberModel.name) private readonly subscriberModel: Model<SubscriberModel>
  ) {}

  public async create(item: SubscriberEntity): Promise<ISub> {
    const newEmailSubscriber = new this.subscriberModel(item);
    return newEmailSubscriber.save();
  }

  public async destroy(id: string): Promise<void> {
    this.subscriberModel.deleteOne({ id });
  }

  public async findOne(id: string): Promise<ISub | null> {
    return this.subscriberModel
        .findOne({ id })
        .exec();
  }

  public async findByEmail(email: string): Promise<ISub | null> {
    return this.subscriberModel
      .findOne({ email })
      .exec()
  }

  public async findByUserID(userID: string): Promise<ISub | null> {
    return this.subscriberModel
      .findOne({ userId: userID })
      .exec()
  }
}
