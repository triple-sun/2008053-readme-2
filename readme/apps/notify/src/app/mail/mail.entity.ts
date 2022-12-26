import { IEntity, IMail } from "@readme/shared-types";

export class MailEntity implements IEntity<MailEntity>, IMail {
  public email: string;
  public name: string;
  public postIDs: string[]

  constructor(post: IMail) {
    this.fillEntity(post);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(entity: IMail) {
    this.email = entity.email;
    this.name = entity.name;
    this.postIDs = entity.postIDs;
  }
}
