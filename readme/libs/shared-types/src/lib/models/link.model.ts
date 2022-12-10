import { ApiProperty } from "@nestjs/swagger";
import { ContentType } from "@prisma/client";
import { MinMax } from "@readme/core";
import { Expose } from "class-transformer";
import { Content } from "./content.model";

export class Link extends Content {
  constructor() {
    super(ContentType.LINK)
  }

  @ApiProperty({
    required: true
  })
  @Expose()
  public url?: string;

  @ApiProperty({
    maxLength: MinMax.DescMax
  })
  @Expose()
  public desc?: string;
}
