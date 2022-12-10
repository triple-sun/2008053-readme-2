import { ApiProperty } from "@nestjs/swagger";
import { ContentType } from "@prisma/client";
import { Exclude, Expose } from "class-transformer";

export class Content {
  @ApiProperty({
    required: true,
    enum: ContentType
  })
  @Expose()
  public type: ContentType;

  @ApiProperty({
    required: true,
  })
  @Exclude()
  public id: number;

  constructor(type: ContentType) {
    this.type = type
  }
}
