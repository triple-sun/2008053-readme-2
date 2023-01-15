import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class PageQuery {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => +value)
  public page?: number;
}
