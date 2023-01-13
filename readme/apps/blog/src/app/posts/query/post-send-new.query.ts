import { ApiProperty, IntersectionType, PickType } from "@nestjs/swagger";
import { PostQuery } from "./post.query";
import { Expose } from "class-transformer";
import { IsEmail } from "class-validator";
import { UserAPIDesc, UserAPIExample, UserError } from "@readme/core";

class UserEmailQuery {
  @Expose()
  @IsEmail({},{message: UserError.Email})
  @ApiProperty({
    description: UserAPIDesc.Email,
    example: UserAPIExample.Email
  })
  public email: string;
}

export class PostSendNewQuery extends IntersectionType(
  UserEmailQuery,
  PickType(
    PostQuery, ['userIDs'] as const
  )
) {}
