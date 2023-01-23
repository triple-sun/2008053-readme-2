import { IEntity, ISub } from "@readme/shared-types";

export class SubscriberEntity implements IEntity<SubscriberEntity>, ISub {
  public id: string;
  public email: string;
  public name: string;
  public userId: string;
  public notifiedAt?: Date;

  constructor(emailSubscriber: ISub) {
    this.fillEntity(emailSubscriber);
  }

  public fillEntity(entity: ISub) {
    this.email = entity.email;
    this.id = entity.id;
    this.name = entity.name;
    this.userId = entity.userId
    this.notifiedAt = entity.notifiedAt
  }

  public toObject(): SubscriberEntity {
    return { ...this };
  }
}
