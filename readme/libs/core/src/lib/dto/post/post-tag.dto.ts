import { ApiPropertyOptional } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";
import { ValidateLength } from "../../decorator/validate-length.decorator";
import { Property } from "../../enum/property.enum";
import { APIOption } from "../../utils/api.utils";

const { Tag } = Property;

export class PostTagDTO {
  @Expose()
  @IsOptional({})
  @IsString()
  @Transform(({ value }) => value ? [... new Set(value.map((tag: string) => tag.toLowerCase()))] : [])
  @ValidateLength()
  @ApiPropertyOptional(APIOption.Post(Tag))
  public tag?: string;
}
