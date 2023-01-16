import { PickType } from "@nestjs/swagger";
import { User } from "../entity/user";

export class EmailQuery extends PickType(User, ['email'] as const) {}
