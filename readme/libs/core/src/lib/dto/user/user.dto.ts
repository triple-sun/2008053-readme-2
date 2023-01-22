import { IsDefined, IsEmail, IsMongoId, IsOptional, IsString, ValidateIf } from 'class-validator';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional, IntersectionType, PartialType, PickType } from "@nestjs/swagger";

import { Property } from '../../enum/property.enum';
import { UserError } from "../../const/error.const";
import { ValidateLength } from "../../decorator/validate-length.decorator";
import { UserProperty } from "../../utils/api.utils";
import { Size } from '../../utils/size.utils';
import { FileSystemStoredFile, HasMimeType, IsFile, MaxFileSize } from 'nestjs-form-data';
import mongoose, { ObjectId } from 'mongoose';

export class UserDTO {
  @Expose()
  @IsMongoId()
  @ApiProperty(UserProperty(Property.UserID))
  public id: string;

  @Expose()
  @IsEmail({},{ message: UserError.Email.Invalid } )
  @ApiProperty(UserProperty(Property.Email, {required: true, }))
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
  @ValidateIf(({value}) => !!value)
  @IsFile()
  @MaxFileSize(5e5)
  @HasMimeType(['image/jpeg', 'image/png'])
  @ApiPropertyOptional(UserProperty(Property.Avatar, {type: 'string', format: 'binary'}))
  public avatar?: FileSystemStoredFile
}

export class UserCreateDTO extends PickType(UserDTO, ['email', 'name', 'password', 'avatar'] as const) {}

export class UserLoginDTO extends PickType(UserDTO, ['email', 'password'] as const) {}

export class UserIDDTO extends PartialType(PickType(UserDTO, ['id'] as const)) {
  @Expose(( {name: Property.Id }))
  @Transform(({obj}) => obj.userId = obj.id)
  @Type(() => mongoose.SchemaTypes.ObjectId)
  public userId: ObjectId

  @Exclude()
  public id?: string
}

export class AvatarDTO extends PickType(UserDTO, ['avatar'] as const) {}

export class UserAuthDTO extends IntersectionType(
  PickType(UserIDDTO, ['id'] as const), PartialType(PickType(UserDTO, ['name', 'email'] as const))
) {}

export class UserUpdateDTO extends PartialType(PickType(UserDTO, ['avatar', 'password'] as const)) {}

export class SubcribeDTO {
  @IsDefined()
  @IsMongoId()
  @ApiProperty(UserProperty(Property.SubToID))
  public subToID: string
}
