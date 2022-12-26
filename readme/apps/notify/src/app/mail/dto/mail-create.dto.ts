import { ApiProperty } from '@nestjs/swagger';
import { MailAPIProp } from '@readme/core';
import { IPost } from '@readme/shared-types';
import { IsArray, IsEmail, IsString, ValidateNested } from 'class-validator';

export class MailCreateDTO {
  @IsEmail()
  @ApiProperty(MailAPIProp.Email)
  public email?: string;

  @IsString()
  @ApiProperty(MailAPIProp.Name)
  public name?: string;

  @IsArray()
  @ValidateNested()
  @ApiProperty(MailAPIProp.Posts)
  public posts?: IPost[];
}
