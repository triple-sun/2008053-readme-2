import { ApiProperty } from "@nestjs/swagger";
import { APIOption, NotifyDTO, PostRDO, Property, TPostRDO } from "@readme/core";
import { Expose, Type } from "class-transformer";
import { IsArray, IsMongoId, Validate } from "class-validator";
import { SubExistsID } from "../validators/sub-exists.validator";

export class SubscriberNotifyDTO extends NotifyDTO {
  @Expose()
  @IsArray()
  @Type(() => PostRDO)
  @ApiProperty(APIOption.User(Property.Posts))
  public posts: TPostRDO[];

  @Expose()
  @IsMongoId()
  @ApiProperty(APIOption.User(Property.UserID))
  @Validate(SubExistsID)
  public userID: string;
}
