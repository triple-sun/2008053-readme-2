import { PickType } from "@nestjs/swagger";
import { UserData } from "../entity/user-data";

export class EmailQuery extends PickType(UserData, ['email'] as const) {}
