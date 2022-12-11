import { ApiProperty } from "@nestjs/swagger";
import { MinMax } from "@readme/core";
import { UserAPIDesc, UserAPIExample } from "@readme/shared-types";
import { Expose } from "class-transformer";
import { IsArray, IsEmail, IsString } from "class-validator";
import { UserError } from "../../app.enum";

export class UserCreateDTO {
  @ApiProperty({
    description: UserAPIDesc.Email,
    example: UserAPIExample.Email
  })
  @IsEmail({},{
    message: UserError.Email
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: UserAPIDesc.Name,
    example: UserAPIExample.Name,
    maxLength: MinMax.UserNameMax,
    minLength: MinMax.UserNameMin
  })
  @IsString()
  @Expose()
  public name: string;

  @ApiProperty({
    description: UserAPIDesc.Pass,
    example: UserAPIExample.Pass,
    maxLength: MinMax.UserPassMax,
    minLength: MinMax.UserPassMin
  })
  @IsString()
  public password: string;

  @ApiProperty({
    description: UserAPIDesc.AvatarUrl,
    example: UserAPIExample.FilePath
  })
  @IsString()
  @Expose()
  public avatarUrl: string;

  @ApiProperty({
    description: UserAPIDesc.Subs,
    example: UserAPIExample.Subs
  })
  @IsArray()
  @Expose()
  public subscriptions: string[];
}
