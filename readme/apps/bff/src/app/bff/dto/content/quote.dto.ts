import { Expose } from "class-transformer";
import { IsString, ValidateIf } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { PostProperty, Property, Size, ValidateLength } from "@readme/core";
import { ContentType } from "@prisma/client";

export class Quote {
  @Expose()
  public author: string;
  public quote: string;
}

export class QuoteDTO extends Quote {
  @Expose()
  @ValidateIf(o => o.type === ContentType.QUOTE)
  @IsString()
  @ValidateLength()
  @ApiProperty(PostProperty(Property.Quote, {minLength: Size.Quote.Min, maxLength: Size.Quote.Max}))
  public quote: string;

  @Expose()
  @ValidateIf(o => o.type === ContentType.QUOTE)
  @IsString()
  @ValidateLength()
  @ApiProperty(PostProperty(Property.Author, {minLength: Size.Author.Min, maxLength: Size.Author.Max}))
  public author: string;
}

