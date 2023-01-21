import { IsDefined, IsEmail, IsJWT, IsMongoId, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, IntersectionType, PartialType, PickType } from "@nestjs/swagger";

import { Property } from '../../enum/property.enum';
import { UserError } from "../../const/error.const";
import { ValidateLength } from "../../decorator/validate-length.decorator";
import { UserProperty } from "../../utils/api.utils";
import { Expose, Transform } from 'class-transformer';
import { Size } from '../../utils/size.utils';

export class UserDTOBase {
  @Expose({ name: Property.ObjectID})
  @IsMongoId()
  public id: string

  @Expose()
  @IsEmail()
  public email: string

  @Expose()
  @IsString()
  public name: string

  @IsString()
  public password: string

  @Expose()
  public avatar?: Express.Multer.File;

  @Expose()
  @IsString()
  public avatarLink?: string;
}

export class UserDTO extends UserDTOBase {
  @Expose()
  @IsMongoId()
  @ApiProperty(UserProperty(Property.UserID))
  public id: string;

  @Expose()
  @IsEmail({},{ message: UserError.Email.Invalid } )
  @ApiProperty(UserProperty(Property.Email))
  public email: string;

  @Expose()
  @IsString()
  @ValidateLength()
  @ApiProperty(UserProperty(Property.Name, { minLength: Size.Name.Min, maxLength: Size.Name.Max }))
  public name: string;

  @Expose()
  @IsString()
  @ValidateLength()
  @ApiProperty(UserProperty(Property.Password, { minLength: Size.Password.Min, maxLength: Size.Password.Max }))
  public password: string

  @IsOptional()
  @ApiPropertyOptional(UserProperty(Property.Avatar))
  public avatar?: Express.Multer.File

  @Expose()
  @IsOptional()
  @Transform(({ obj }) => obj.avatar ? obj.avatar.filepath : null)
  @ApiPropertyOptional(UserProperty(Property.AvatarLink, { default: '' }))
  public avatarLink?: string;
}

export class TokenDTO {
  @IsJWT()
  public token: string;
}

export class UserCreateDTO extends PickType(UserDTO, ['email', 'name', 'password', 'avatar', 'avatarLink'] as const) {}

export class UserLoginDTO extends PickType(UserDTO, ['email', 'password'] as const) {}

export class UserIDDTO extends PickType(UserDTO, ['id'] as const) {}
export class AvatarDTO extends PickType(UserDTO, ['avatar'] as const) {}


export class UserLoggedRDO extends PickType(UserDTOBase, ['email', 'id', 'name'] as const) {}

export class UserAuthDTO extends IntersectionType(
  PickType(UserDTOBase, ['id'] as const), PartialType(PickType(UserDTOBase, ['name', 'email'] as const))
) {}

export class UserUpdateDTO extends PartialType(PickType(UserDTO, ['avatar', 'avatarLink', 'password'] as const)) {}

export class UserSubscribeDTO {
  @IsDefined()
  @IsMongoId()
  @ApiProperty(UserProperty(Property.SubToID))
  public subToID: string
}
