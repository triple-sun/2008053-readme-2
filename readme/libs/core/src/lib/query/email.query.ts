import { PickType } from "@nestjs/swagger";
import { UserDTO } from "../dto/user.dto";

export class EmailQuery extends PickType(UserDTO, ['email'] as const) {}
