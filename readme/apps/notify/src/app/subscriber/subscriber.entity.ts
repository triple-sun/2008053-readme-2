import { IEntity, ISubscriber } from "@readme/shared-types";

export class SubscriberEntity implements IEntity<SubscriberEntity>, ISubscriber {
  public id: string;
  public email: string;
  public name: string;
  public userID: string;
  public posts?: number[];
  public subscriptions?: string[];
  public notifiedAt?: Date;

  constructor(emailSubscriber: ISubscriber) {
    this.fillEntity(emailSubscriber);
  }

  public fillEntity(entity: ISubscriber) {
    this.email = entity.email;
    this.userID = entity.userID;
    this.name = entity.name;
    this.id = entity.id ?? '';
    this.posts = entity.posts ?? [];
    this.subscriptions = entity.subscriptions ?? [];
    this.notifiedAt = entity.notifiedAt ?? new Date();
  }

  public toObject(): SubscriberEntity {
    return { ...this };
  }
}
