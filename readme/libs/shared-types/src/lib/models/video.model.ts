import { ApiProperty } from "@nestjs/swagger";
import { ContentType } from "@prisma/client";
import { MinMax } from "@readme/core";
import { Expose } from "class-transformer";
import { Content } from "./content.model";

export class Video extends Content {
  constructor() {
    super(ContentType.VIDEO)
  }

  @ApiProperty({
    required: true,
    minLength: MinMax.TitleMin,
    maxLength: MinMax.TitleMax
  })
  @Expose()
  title?: string;

  @ApiProperty({
    required: true
  })
  @Expose()
  videoUrl: string;
}
