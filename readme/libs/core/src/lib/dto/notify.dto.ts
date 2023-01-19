import { PickType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import { PostRDO, TPostRDO } from "../rdo/post.rdo";
import { UserDTO } from "./user.dto";

export class NotifyDTO extends PickType(UserDTO, ['userID'] as const) {
  @IsArray()
  @Type(() => PostRDO)
  @ValidateNested()
  public posts: TPostRDO[]
}

