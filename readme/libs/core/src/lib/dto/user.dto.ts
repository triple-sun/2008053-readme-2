import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEmail, IsJWT, IsMongoId, IsString, Length } from "class-validator";
import { Size } from "../const/api-options.const";
import { Property } from "../enum/property.enum";
import { ValidationMessage } from "../error/validation.error";
import { APIProp } from "../utils/api.utils";

const { Min, Max } = Size
const { Token, UserID, Name, Email } = Property
const { Users } = APIProp

export class UserDTO {
  @Expose()
  @IsString()
  @Length(Min(Name), Max(Name), { message: ValidationMessage.Length })
  @ApiProperty(Users(Name))
  public name: string;

  @Expose()
  @IsEmail({},{ message: ValidationMessage.Email })
  @ApiProperty(Users(Email))
  public email: string;

  @Expose()
  @IsMongoId()
  @ApiProperty(Users(UserID))
  public userID: string;
}

export class UserTokenDTO {
  @Expose()
  @IsJWT()
  @ApiProperty(Users(Token))
  public token: string;
}

