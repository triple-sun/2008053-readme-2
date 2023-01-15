import { PickType } from "@nestjs/swagger";
import { UserDTO } from "@readme/core";

export class SubscriberNotifyDTO extends PickType(UserDTO, ['userID'] as const) {}
