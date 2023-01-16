import { PickType } from "@nestjs/swagger";
import { UserData } from "../entity/user-data";

export class NotifyNewMsg extends PickType(UserData, ['email', 'userID'] as const) {}

