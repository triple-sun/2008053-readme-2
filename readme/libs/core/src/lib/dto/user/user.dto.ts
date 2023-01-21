import { IsEmail, IsJWT, IsMongoId, IsString } from 'class-validator';
import { Property } from '../../enum/property.enum';
import { ApiProperty, IntersectionType, PickType } from "@nestjs/swagger";
import { UserError } from "../../const/error.const";
import { ValidateLength } from "../../decorator/validate-length.decorator";
import { UserProperty } from "../../utils/api.utils";
import { Expose } from 'class-transformer';

const { UserID, Name, Email, Avatar, ObjectID } = Property

export class User {
  @Expose({ name: ObjectID})
  @IsMongoId()
  public userID: string

  @Expose()
  @IsEmail()
  public email: string

  @Expose()
  @IsString()
  public name: string

  @Expose()
  public avatar?: Express.Multer.File;

  @Expose()
  @IsString()
  public avatarLink?: string;
}


export class UserIDDTO extends PickType(User, ['userID'] as const) {
  @Expose()
  @IsMongoId()
  @ApiProperty(UserProperty(UserID))
  public userID: string;
}

export class EmailDTO extends PickType(User, ['email'] as const) {
  @Expose()
  @IsEmail({},{ message: UserError.Email.Invalid } )
  @ValidateLength()
  @ApiProperty(UserProperty(Email))
  public email: string;
}

export class NameDTO extends PickType(User, ['name'] as const)  {
  @Expose()
  @IsString()
  @ValidateLength()
  @ApiProperty(UserProperty(Name))
  public name: string;
}

export class AvatarDTO extends PickType(User, ['avatar'] as const) {
  @Expose()
  @IsString()
  @ValidateLength()
  @ApiProperty(UserProperty(Avatar))
  public avatar: Express.Multer.File
}

export class TokenDTO {
  @Expose()
  @IsJWT()
  public token: string;
}

export class UserCreateDTO extends IntersectionType(
  IntersectionType(UserIDDTO, EmailDTO),
  IntersectionType(NameDTO, AvatarDTO)
) {}



