import { IsArray, IsString } from "class-validator";
import { TPostRDO } from "../rdo/post.rdo";

export class NotifyDTO {
  @IsArray()
  public posts: TPostRDO[]

  @IsString()
  public userID: string
}
