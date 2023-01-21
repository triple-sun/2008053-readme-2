import { PartialType, PickType } from "@nestjs/swagger";
import { UserCreateDTO } from "./user/user-create.dto";

export class SubscriberCreateDTO extends PickType(UserCreateDTO, ['email', 'name', 'userID'] as const) {}

export class SubscriberUpdateDTO extends PartialType(SubscriberCreateDTO) {}

