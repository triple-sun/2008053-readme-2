import { ApiProperty } from '@nestjs/swagger';
import { Post } from '@prisma/client';
import { MailAPIProp } from '@readme/core';
import { IsArray, IsEmail, IsString } from 'class-validator';

export class NewPostsDTO {
  @IsEmail()
  @ApiProperty(MailAPIProp.Email)
  public email?: string;

  @IsString()
  @ApiProperty(MailAPIProp.Name)
  public name?: string;

  @IsArray()
  @ApiProperty(MailAPIProp.Posts)
  public posts?: Post[];
}
