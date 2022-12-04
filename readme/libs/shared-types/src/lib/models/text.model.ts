import { ApiProperty } from "@nestjs/swagger";
import { ContentType } from "@prisma/client";
import { MinMax } from "@readme/core";
import { Expose } from "class-transformer";
import { Content } from "./content.model";

export class Text extends Content {
  constructor() {
    super(ContentType.TEXT)
  }

  @ApiProperty({
    required: true,
    minLength: MinMax.TitleMin,
    maxLength: MinMax.TitleMax
  })
  @Expose()
  public title?: string;

  @ApiProperty({
    required: true,
    minLength: MinMax.AnnMin,
    maxLength: MinMax.AnnMax
  })
  @Expose()
  public ann: string;

  @ApiProperty({
    required: true,
    minLength: MinMax.TextMin,
    maxLength: MinMax.TextMax
  })
  @Expose()
  public text: string;
}
