import { ApiProperty, PickType } from "@nestjs/swagger";
import { APIProp, Property, Size, UserDTO, ValidationMessage } from "@readme/core";
import { Transform } from "class-transformer";
import { IsOptional, IsString, Length } from "class-validator";

const { Max, Min } = Size
const { Pass, Avatar } = Property
const { Users } = APIProp

export class UserCreateDTO extends PickType(UserDTO, ['email', 'name']) {
  @IsString()
  @IsOptional()
  @Transform(({ obj }) => obj ? obj.path : '')
  @ApiProperty(Users(Avatar))
  public avatar?: string

  @IsString()
  @Length(Min(Pass), Max(Pass), { message: ValidationMessage.Length })
  @ApiProperty(Users(Pass))
  public password: string;
}
