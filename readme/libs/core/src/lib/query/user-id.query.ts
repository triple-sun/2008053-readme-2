import { PickType } from "@nestjs/swagger";
import { UserData } from "../entity/user-data";

export class UserIDQuery extends PickType(UserData, ['userID'] as const) {}
