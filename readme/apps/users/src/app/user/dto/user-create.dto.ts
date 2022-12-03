import { ApiProperty } from "@nestjs/swagger";
import { MinMax } from "@readme/core";
import { UserAPIDesc, UserAPIExample } from "@readme/shared-types";
import { Expose } from "class-transformer";

export class UserCreateDTO {
  @ApiProperty({
    description: UserAPIDesc.Email,
    example: UserAPIExample.Email
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: UserAPIDesc.Name,
    example: UserAPIExample.Name,
    maxLength: MinMax.UserNameMax,
    minLength: MinMax.UserNameMin
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: UserAPIDesc.Pass,
    example: UserAPIExample.Pass,
    maxLength: MinMax.UserPassMax,
    minLength: MinMax.UserPassMin
  })
  public password: string;

  @ApiProperty({
    description: UserAPIDesc.AvatarUrl,
    example: UserAPIExample.FilePath
  })
  @Expose()
  public avatarUrl: string;

  @ApiProperty({
    description: UserAPIDesc.Subs,
    example: UserAPIExample.Subs
  })
  @Expose()
  public subscriptions: string[];
}
