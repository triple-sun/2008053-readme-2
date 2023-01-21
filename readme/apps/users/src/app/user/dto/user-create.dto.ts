import { ApiProperty, ApiPropertyOptional, PickType } from "@nestjs/swagger";
import { APIOption, Property, UserDTO, ValidateLength } from "@readme/core";
import { Expose } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

const { Password: Pass, Avatar } = Property
const { User } = APIOption

export class UserCreateDTO extends PickType(UserDTO, ['email', 'name']) {
  @Expose()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional(User(Avatar, {type: 'string', format: 'binary'}))
  public avatar?: string

  @Expose()
  @IsString()
  @ValidateLength()
  @ApiProperty(User(Pass))
  public password: string;
}
