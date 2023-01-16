import { Post } from "@prisma/client";
import { IsArray, IsString } from "class-validator";

export class NotifyDTO {
  @IsArray()
  public posts: Post[]

  @IsString()
  public userID: string
}
