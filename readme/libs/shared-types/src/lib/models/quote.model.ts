import { ApiProperty } from "@nestjs/swagger";
import { ContentType } from "@prisma/client";
import { MinMax } from "@readme/core";
import { Expose } from "class-transformer";
import { Content } from "./content.model";

export class Quote extends Content {
  constructor() {
    super(ContentType.QUOTE)
  }

  @ApiProperty({
    required: true,
    minLength: MinMax.QuoteMin,
    maxLength: MinMax.QuoteMax
  })
  @Expose()
  quote: string;

  @ApiProperty({
    required: true,
    minLength: MinMax.AuthorMin,
    maxLength: MinMax.AuthorMax
  })
  @Expose()
  author: string;
}
