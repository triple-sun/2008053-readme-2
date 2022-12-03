import { ApiProperty } from "@nestjs/swagger";

export class UploadFileDTO {
  @ApiProperty({
    type: String,
    format: 'binary',
  })
  public file: string;
}
