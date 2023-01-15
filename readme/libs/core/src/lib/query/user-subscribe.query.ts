import { ApiProperty, IntersectionType, PickType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsMongoId } from "class-validator";
import { UsersAPIProp } from "../api-props/users/users.api-prop";
import { UserDTO } from "../dto/user.dto";

export class SubToIDDTO {
  @Expose()
  @IsMongoId()
  @ApiProperty(UsersAPIProp.SubToID)
  subToID: string;
}

export class UserSubscribeQuery extends IntersectionType(
  SubToIDDTO,
  PickType(UserDTO, ['userID'] as const)
) {}
