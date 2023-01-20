import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { ArrayMaxSize, IsArray, IsOptional, IsString } from "class-validator";
import { Size } from "../../const/size.const";
import { ValidateLength } from "../../decorator/validate-length.decorator";
import { Property } from "../../enum/property.enum";
import { APIOption } from "../../utils/api.utils";
import { TransformOptions } from "../../utils/transform.utils";

const { Tags } = Property;
const { Post } = APIOption

export class PostTagsDTO {
  @Expose()
  @IsOptional({})
  @ArrayMaxSize(Size.Tags.Max)
  @Transform(TransformOptions.Tags)
  @ValidateLength({each: true})
  @IsArray({})
  @IsString({each: true})
  @ApiProperty(Post(Tags))
  public tags?: string[];
}
