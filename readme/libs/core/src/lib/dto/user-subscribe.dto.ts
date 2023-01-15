import { ApiProperty, IntersectionType, PickType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsMongoId } from "class-validator";
import { UsersAPIProp } from "../api-props/users/users.api-prop";
import { UserDTO } from "./user.dto";

export class SubToIDDTO {
  @Expose()
  @IsMongoId()
  @ApiProperty(UsersAPIProp.SubToID)
  subToID: string;
}

export class UserSubscribeDTO extends IntersectionType(
  SubToIDDTO,
  PickType(UserDTO, ['userID'] as const)
) {}
