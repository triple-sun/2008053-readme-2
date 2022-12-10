import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { Content } from "./content.model";

export class Photo extends Content {
  @ApiProperty({
    required: true
  })
  @Expose()
  public photo: string;
}
