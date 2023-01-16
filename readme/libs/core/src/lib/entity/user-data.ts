import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsArray, IsEmail, IsInt, IsJWT, IsMongoId, IsOptional, IsString, Length } from "class-validator";
import { UsersAPIProp } from "../api-props/users/users.api-prop";
import { FieldName } from "../enum/field-name.enum";
import { MinMax } from "../enum/minmax.enum";
import { UserError } from "../enum/users.enum";
import { ValidationErrorMessage } from "../utils/error.utils";


export class UserData {
  @Expose()
  @IsMongoId()
  @ApiProperty(UsersAPIProp[FieldName.UserID])
  public userID: string;

  @Expose()
  @IsJWT()
  @ApiProperty(UsersAPIProp[FieldName.Token])
  public token: string;

  @Expose()
  @IsString()
  @Length(MinMax.UserNameMin, MinMax.UserNameMax, { message: ValidationErrorMessage.Length })
  @ApiProperty(UsersAPIProp[FieldName.Name])
  public name: string;

  @Expose()
  @IsEmail({},{message: UserError.Email})
  @ApiProperty(UsersAPIProp[FieldName.Email])
  public email: string;

  @Expose()
  @IsArray({each: true})
  @IsInt()
  @ApiProperty(UsersAPIProp[FieldName.Posts])
  public posts: number[];

  @Expose()
  @IsArray({each: true})
  @IsMongoId()
  @ApiProperty(UsersAPIProp[FieldName.Subscribers])
  public subscribers: string[];

  @IsString()
  @Length(MinMax.UserPassMin, MinMax.UserPassMax,{ message: ValidationErrorMessage.Length })
  @ApiProperty(UsersAPIProp[FieldName.Password])
  public password: string;

  @Expose()
  @IsString()
  @IsOptional()
  @ApiProperty(UsersAPIProp[FieldName.AvatarUrl])
  public avatarUrl?: string;
}
