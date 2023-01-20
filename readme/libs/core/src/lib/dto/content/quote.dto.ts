import { Expose } from "class-transformer";
import { IsString} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { Property } from "../../enum/property.enum";
import { ValidateLength } from "../../decorator/validate-length.decorator";
import { APIOption } from "../../utils/api.utils";

const { Quote, Author } = Property;

export class QuoteDTO {
  @Expose()
  @IsString()
  @ValidateLength()
  @ApiProperty(APIOption.Post(Quote))
  public quote?: string;

  @Expose()
  @IsString()
  @ValidateLength()
  @ApiProperty(APIOption.Post(Author))
  public author?: string;
}
