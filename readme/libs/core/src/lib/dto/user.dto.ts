import { ApiProperty } from "@nestjs/swagger";
import { AppError } from "@readme/error";
import { Expose } from "class-transformer";
import { IsEmail, IsJWT, IsMongoId, IsString } from "class-validator";
import { ValidateLength } from "../decorator/validate-length.decorator";
import { Property } from "../enum/property.enum";
import { APIOption } from "../utils/api.utils";

const { Token, UserID, Name, Email } = Property

export class UserDTO {
  @Expose()
  @IsString()
  @ValidateLength()
  @ApiProperty(APIOption.User(Name))
  public name: string;

  @Expose()
  @IsEmail({},{ message: AppError.User.Email.Invalid } )
  @ApiProperty(APIOption.User(Email))
  public email: string;

  @Expose()
  @IsMongoId()
  @ApiProperty(APIOption.User(UserID))
  public userID: string;
}

export class UserTokenDTO {
  @Expose()
  @IsJWT()
  @ApiProperty(APIOption.User(Token))
  public token: string;
}

