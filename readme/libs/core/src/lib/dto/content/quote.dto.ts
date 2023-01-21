import { Expose } from "class-transformer";
import { IsString} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { ValidateLength } from "../../decorator/validate-length.decorator";
import { Property } from "../../enum/property.enum";
import { PostProperty } from "../../utils/api.utils";
import { Size } from "../../const/size.const";

export class Quote {
  @Expose()
  @IsString()
  public author: string;

  @Expose()
  @IsString()
  public quote: string;
}

export class QuoteDTO extends Quote {
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

export class QuoteRDO extends Quote {}
