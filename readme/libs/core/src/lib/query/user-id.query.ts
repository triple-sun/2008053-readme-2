import { PickType } from "@nestjs/swagger";
import { UserDTO } from "../dto/user.dto";

export class UserIDQuery extends PickType(UserDTO, ['userID'] as const) {}
