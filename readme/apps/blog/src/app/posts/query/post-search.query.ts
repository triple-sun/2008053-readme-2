import { IsString } from "class-validator";

export class PostSearchQuery {
  @IsString()
  public find: string;
}
