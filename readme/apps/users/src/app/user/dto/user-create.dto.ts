import { ApiProperty, PickType } from "@nestjs/swagger";
import { APIOption, Property, UserDTO, ValidateLength } from "@readme/core";
import { Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

const { Pass, Avatar } = Property
const { User } = APIOption

export class UserCreateDTO extends PickType(UserDTO, ['email', 'name']) {
  @IsString()
  @IsOptional()
  @Transform(({ obj }) => obj ? obj.path : '')
  @ApiProperty(User(Avatar))
  public avatar?: string

  @IsString()
  @ValidateLength()
  @ApiProperty(User(Pass))
  public password: string;
}
