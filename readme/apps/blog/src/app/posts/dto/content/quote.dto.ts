import { Expose } from "class-transformer";
import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { PostProperty, Property, Size, ValidateLength } from "@readme/core";

export class QuoteRDO {
  @Expose()
  @IsString()
  public author: string;

  @Expose()
  @IsString()
  public quote: string;
}

export class QuoteDTO extends QuoteRDO {
  @Expose()
  @IsString()
  @ValidateLength()
  @ApiProperty(PostProperty(Property.Quote, {minLength: Size.Quote.Min, maxLength: Size.Quote.Max}))
  public quote: string;

  @Expose()
  @IsString()
  @ValidateLength()
  @ApiProperty(PostProperty(Property.Author, {minLength: Size.Author.Min, maxLength: Size.Author.Max}))
  public author: string;
}

